# 📈 Smoothie Therapy — Financial Recap & Performance Guide
**Folder:** `04 - Financial Recaps`  
**Linked Google Sheet:** [Dashboard & Rekap Omset Tab](https://docs.google.com/spreadsheets/d/1QYlWAJu95TnxnsKPjKj5TH7tuWENkgXEFNCsn19GLvU/edit#gid=361699576)  

---

## 1. 📊 Key Performance Indicators (KPIs)
The Google Sheet POS automatically tracks real-time KPIs in Tab 3:
- **Total Omset Lunas (Gross Revenue)**: `SUMIF` of all confirmed `LUNAS / PAID` orders.
- **Total Pesanan Lunas (Paid Order Count)**: Total successfully converted orders.
- **Average Order Value (AOV)**: `Total Omset Lunas / Total Pesanan Lunas`
- **Kitchen Stage Backlog**: Count of orders in queue (`Menunggu Bukti`, `Sedang Diproses`, `Siap Diambil/Diantar`).

---

## 2. 🗓️ Monthly Close & Export Checklist
1. **End-of-Month CSV Export**:
   - Open [Order Dispatcher](http://localhost:8080/order-manager.html) (PIN: `2026`).
   - Click `📥 Unduh CSV`.
   - Rename to `Smoothie_Therapy_Orders_YYYY_MM.csv`.
   - Upload to `04 - Financial Recaps` on Google Drive.
2. **Sheet Archival**:
   - In Google Sheets, duplicate the `Konfirmasi Pembayaran` tab as `Archive_YYYY_MM` to lock the historical log.
   - Use `🗑️ HAPUS / CLEAR` or the bulk clear script on the active sheet for the new month.
3. **Reconciliation**:
   - Compare Bank Transfer & QRIS settlement payouts with `Total Omset Lunas`.
