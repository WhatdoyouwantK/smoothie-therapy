# Live Customer Reviews — Google Apps Script Setup

Your Google Sheet already has the **`Ulasan`** tab created and pre-filled with the 4 starter reviews (`Ng Ko Bun`, `Camishya`, `Shafa`, `Bintang`):
- Sheet URL: https://docs.google.com/spreadsheets/d/1QYlWAJu95TnxnsKPjKj5TH7tuWENkgXEFNCsn19GLvU/edit
- Columns in **`Ulasan`**: `Timestamp | Nama | Rating | Menu Favorit | Ulasan | Approved`

## 1. Open Your Existing Apps Script
1. Open the Google Sheet link above.
2. Click **Extensions → Apps Script**.

## 2. Add These 2 Snippets to `Code.gs`

### A) At the very top of your existing `doPost(e)` (right after parsing `data`)
Paste this `if` block **before** your existing order-saving code so normal orders keep working unchanged:

```javascript
  // === Customer Reviews Handler ===
  if (data.type === 'review') {
    var reviewSheet = ss.getSheetByName('Ulasan') || ss.insertSheet('Ulasan');
    if (reviewSheet.getLastRow() === 0) {
      reviewSheet.appendRow(['Timestamp', 'Nama', 'Rating', 'Menu Favorit', 'Ulasan', 'Approved']);
    }
    var rating = Math.min(5, Math.max(1, Number(data.rating) || 5));
    reviewSheet.appendRow([
      new Date(),
      String(data.name || '').trim().slice(0, 40),
      rating,
      String(data.favorite || '🍓 Smoothie Therapy').trim().slice(0, 50),
      String(data.quote || '').trim().slice(0, 220),
      'YES' // Change to 'PENDING' if you want to approve reviews manually in the Sheet first
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', type: 'review' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
```

> **Note:** Make sure `ss` is `SpreadsheetApp.getActiveSpreadsheet()` (or `SpreadsheetApp.openById('1QYlWAJu95TnxnsKPjKj5TH7tuWENkgXEFNCsn19GLvU')`). If your `doPost(e)` uses a different variable name for the spreadsheet (e.g. `sheet` or `spreadsheet`), replace `ss` above with that variable name, or write `var ss = SpreadsheetApp.getActiveSpreadsheet();` on the first line inside the `if` block.

### B) At the bottom of `Code.gs` (handles live loading for all visitors)
Paste this `doGet(e)` function at the bottom of your script:

```javascript
function doGet(e) {
  var action = e && e.parameter ? e.parameter.action : '';
  if (action === 'reviews') {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Ulasan');
    var reviews = [];
    if (sheet && sheet.getLastRow() > 1) {
      var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
      for (var i = rows.length - 1; i >= 0; i--) {
        var row = rows[i];
        var approved = String(row[5] || '').trim().toUpperCase();
        var name = String(row[1] || '').trim();
        var quote = String(row[4] || '').trim();
        if (approved === 'YES' && name && quote) {
          reviews.push({
            name: name,
            rating: Math.min(5, Math.max(1, Number(row[2]) || 5)),
            favorite: String(row[3] || '🍓 Smoothie Therapy').trim(),
            quote: quote,
            tag: 'Verified Customer'
          });
        }
      }
    }
    return ContentService
      .createTextOutput(JSON.stringify({ reviews: reviews }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Redeploy (Keep the Same Web App URL!)
1. Click **Save** (`Ctrl+S` / `Cmd+S`).
2. Click **Deploy → Manage deployments**.
3. Click the **pencil (Edit) icon** on your active Web App deployment.
4. Under **Version**, choose **New version** → click **Deploy**.

Because you updated the existing deployment (instead of creating a brand-new one), your `/exec` URL stays identical and the website will immediately start saving and loading live customer reviews for everyone!

## Moderation Tip
- **Auto-publish (default):** New reviews save with `Approved = YES` and appear live for all visitors right away. To hide any review later, just change `YES` to `NO` (or delete the row) in the `Ulasan` tab.
- **Manual approval:** Change `'YES'` to `'PENDING'` in the `doPost` snippet above. Whenever someone submits a review, review it in the `Ulasan` tab and change `PENDING` → `YES` to publish it.
