
Built by https://www.blackbox.ai

---

# Project Title: E-mail Retrieval and Management System

## Project Overview
This project implements an email retrieval and management system that connects to a specified email account using the IMAP protocol. It fetches emails based on predefined search criteria and displays relevant information on a web interface. Users can also refresh the page to retrieve the latest emails and copy specific codes from the emails easily.

## Installation
To set up this project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://your-repo-url.git
    cd your-repo-folder
    ```

2. **Configure your environment**:
   - Open `config.php` and edit the relevant variables:
      - `$mailbox`: Set to your IMAP server address.
      - `$username`: Your email address.
      - `$password`: Your email password.
      - `$pagepw`: Password for accessing the page.
      - `$pagetitle`: Title for your website.
      - `$quota2fa`: Set the limit for retrieved codes.
      - `$maxupdates`: Number of refresh updates.
      - `$updateinterval`: Time interval between updates in milliseconds.

3. **Web server Configuration**:
   - Ensure you have a compatible server set up (like Apache or Nginx) that can parse PHP.
   - Place the project files in the server document root.

4. **Access the application**:
   - Open a web browser and navigate to your server URL (e.g., `http://localhost/index.php`).

## Usage
1. **Retrieving Emails**:
   - The system connects to the configured email account and fetches emails from a specific sender (in this case, `noreply@tm.openai.com`) that were received in the last 24 hours.
   - It displays the user emails along with any relevant codes extracted from the message body.

2. **Copying Codes**:
   - Once the emails are displayed, users can click the "Copy Code" button next to each email entry to copy the corresponding code to their clipboard.
   
3. **Updating Page**:
   - Users can refresh the page to retrieve the latest emails by clicking the "Atualizar Página" button.

## Features
- Connects to an email account using IMAP protocol.
- Filters emails based on the sender and date.
- Extracts and displays specific data (codes) from email body content.
- Functionality for copying codes directly to the clipboard.
- Page can be refreshed to fetch new email data easily.
- Modal pop-up for important announcements or alerts.

## Dependencies
The project does not explicitly list dependencies within a `package.json` file, as it relies on native PHP functions and libraries. Ensure that:
- The server has PHP with IMAP support enabled.

## Project Structure
Here’s an overview of the project structure:

```
/your-project-folder
├── 404.html                # Custom 404 error page
├── 502.html                # Custom 502 error page
├── config.php              # Configuration file for email settings
├── index.html              # Default index page (HTML template)
├── index.php               # Main application file with email retrieval logic
├── info.php                # PHP info page to show current PHP configuration
├── monitor.php             # Script to log visitor IP and access data
└── (other assets like CSS, images, etc.)
```

### Important Note:
Always keep your sensitive credentials secure and never expose them publicly. Consider using environment variables or a secure vault for production environments.