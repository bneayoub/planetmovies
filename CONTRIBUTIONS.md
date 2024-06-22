# Contribution Guidelines

## Branches

### Main Branch
- `master`: The stable and production-ready code.

### Development Branch
- `development`: The branch for integrating all new features and bug fixes before merging into `master`.

### Feature Branches
- `frontend`: Branch for all frontend-related development.
- `backend`: Branch for all backend-related development.
- `ml-model`: Branch for all machine learning model development.

## Branch Naming Conventions
- Use descriptive commit messages.
- Example commit messages:
  - `Implement user authentication on frontend`
  - `Fix bug in backend API endpoint`
  - `Train and export recommendation model`

## Workflow for Creating and Merging Branches

### 1. Working on Frontend, Backend, or ML Model
- Ensure you are on the `development` branch and it is up to date.
- Switch to the appropriate feature branch (`frontend`, `backend`, or `ml-model`).

```bash
git checkout development
git pull origin development
git checkout frontend  # or backend, or ml-model
```

### 2. Making Changes
- Make your changes in the `frontend`, `backend`, or `ml-model` branch.
- Commit your changes with clear and descriptive commit messages.

```bash
git add .
git commit -m "Describe your changes"
```

### 3. Pushing Changes
- Push your branch to the remote repository.

```bash
git push origin frontend  # or backend, or ml-model
```

### 4. Creating a Pull Request
- Once your feature or bugfix is complete, create a pull request (PR) to merge your changes from `frontend`, `backend`, or `ml-model` into `development`.
- Include a clear description of the changes and reference any related issues.
- Assign the other team member as a reviewer.

### 5. Code Review
- Review the PR and provide feedback or request changes if necessary.
- Ensure all tests pass before merging.

### 6. Merging Pull Requests
- Once the PR is approved and all checks pass, merge the changes into `development`.
- Use the `Squash and merge` option to keep the commit history clean.

### 7. Updating Branches
- After merging, ensure `development` is up to date with `master`.
- Delete the `frontend`, `backend`, or `ml-model` branch after merging to keep the repository clean.

```bash
git checkout development
git pull origin development
git checkout master
git pull origin master
git merge development
git push origin master
```

## General Guidelines
- Keep your commits focused. A commit should represent a single change or set of related changes.
- Write clear and concise commit messages.
- Ensure your code follows the project's coding standards and guidelines.
- Regularly pull changes from `development` to keep your branch up to date and avoid conflicts.
- Communicate with your team to avoid duplication of work.

By following these guidelines, we can maintain a clean and manageable codebase, ensuring a smooth and collaborative workflow.
