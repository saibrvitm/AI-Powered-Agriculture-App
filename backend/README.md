# Setting Up a Virtual Environment

### 1. **Create a Virtual Environment**
Run the following command in the project directory:
```bash
python -m venv venv
```
This creates a folder named `venv` containing the isolated Python environment.

---

### 2. **Activate the Virtual Environment**

- **On Windows**:
  ```bash
  venv\Scripts\activate
  ```

- **On macOS/Linux**:
  ```bash
  source venv/bin/activate
  ```

When activated, you'll see `(venv)` in your terminal prompt.

---

### 3. **Using the Virtual Environment**

- Install dependencies inside the virtual environment:
  ```bash
  pip install -r requirements.txt
  ```

- If you add new dependencies, update the `requirements.txt` file:
  ```bash
  pip freeze > requirements.txt
  ```

---

### 4. **Deactivate the Virtual Environment**

When you're done working, deactivate the virtual environment:
```bash
deactivate
```

This returns you to the global Python environment.

---

- Always activate the virtual environment before running or modifying the project.