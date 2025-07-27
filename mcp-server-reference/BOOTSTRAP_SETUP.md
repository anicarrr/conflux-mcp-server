# Universal Bootstrap Script Guide

## Overview
This guide explains how to create and use a universal bootstrap script for your project. The script is designed to be run on a fresh Linux server and will:

- Ensure all required dependencies (like Docker, Python, etc.) are installed
- Download and set up your project (if not already present)
- Run your deploy script to finish the setup

This approach is inspired by tools like EasyPanel and SetupOrion, providing a single command to bootstrap everything needed for your application.

---

## 1. What You Need
- A list of all dependencies (e.g., Docker, Python, Git, curl, etc.)
- Your deploy script (e.g., `deploy.py` or `deploy.sh`)
- (Optional) A public repository or download link for your project

---

## 2. Example Bootstrap Script
Below is a sample `bootstrap.sh` script. You can adapt this to your needs.

```bash
#!/bin/bash
set -e

# 1. Check for root privileges
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (use sudo)"
  exit 1
fi

# 2. Update package list
echo "Updating package list..."
apt-get update

# 3. Install dependencies
REQUIRED_PKG=("curl" "git" "docker.io" "python3" "python3-pip")
for pkg in "${REQUIRED_PKG[@]}"; do
  if ! dpkg -s $pkg >/dev/null 2>&1; then
    echo "Installing $pkg..."
    apt-get install -y $pkg
  else
    echo "$pkg already installed."
  fi
done

# 4. (Optional) Clone your project if not present
if [ ! -d "seiling-buidlbox" ]; then
  echo "Cloning project repository..."
  git clone https://github.com/nicoware-dev/seiling-buidlbox.git
  cd seiling-buidlbox
else
  cd seiling-buidlbox
fi

# 5. (Optional) Download submodules or dependencies
# git submodule update --init --recursive

# 6. Run your deploy script
echo "Running deploy script..."
python3 scripts/deploy.py

echo "✅ All done!"
```

---

## 3. How to Use
1. **Copy the script** above into a file called `bootstrap.sh`.
2. **Edit the script**:
   - Update the `REQUIRED_PKG` array with your actual dependencies.
   - The `git clone` URL is already set to your repository.
   - Change the deploy script path if needed.
3. **Upload the script** to your GitHub repository (recommended).
4. **Run on a new server**:

   ```bash
   curl -sSL https://raw.githubusercontent.com/nicoware-dev/seiling-buidlbox/main/bootstrap.sh | sudo bash
   ```

   Or, if you want to download and run:

   ```bash
   wget https://raw.githubusercontent.com/nicoware-dev/seiling-buidlbox/main/bootstrap.sh
   chmod +x bootstrap.sh
   sudo ./bootstrap.sh
   ```

---

## 4. Tips
- For **CentOS/RHEL** systems, replace `apt-get` with `yum` or `dnf`.
- You can add more logic for OS detection if you want to support multiple distros.
- For more complex setups, consider using Ansible or similar tools.

---

## 5. References
- [EasyPanel Install Command](https://easypanel.io)
- [SetupOrion](https://oriondesign.art.br)
- [Bash Scripting Guide](https://www.gnu.org/software/bash/manual/bash.html)

---

**This approach gives your users a single command to bootstrap everything, just like the examples you shared!** 