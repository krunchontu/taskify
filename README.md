# Taskify 📝

[![GPLv3 License](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)

A modern task management application with intuitive UI and essential productivity features.

![Taskify Screenshot](public/screenshot.png)

## Features ✨

- 🌓 Dark/Light mode toggle with Styled Components theming
- ✅ Task creation, completion toggle, and deletion
- 📅 Due dates and reminder timestamps with permission-aware desktop notifications, snooze/dismiss actions, and inline validation
- ♻️ Recurring tasks (daily/weekly/monthly) spawn the next instance after completion
- 🏷️ Optional categories, tags, and notes to add context without clutter
- ⚡ Local storage persistence with corruption recovery and a 1MB guardrail
- 🛡️ Error boundary fallback plus accessibility touches (status text for empty list, labeled inputs)
- 📱 Responsive design for desktop and mobile

## Installation 🛠️

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/taskify.git
   ```
2. Install dependencies
   ```bash
   cd taskify && npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```

## Usage 🚀

1. **Add a Task**
   - Type your task in the input field
   - Optionally set a due date and reminder
   - Click "Add Task" or press Enter

2. **Manage Tasks**
   - Click a task to toggle completion status
   - Click the red "Delete" button to remove tasks
   - Click the moon/sun icon to toggle theme

3. **Notifications**
   - Allow browser notifications when prompted
   - Receive desktop alerts for upcoming reminders

## Built With 🔧

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [HTML5 Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

## Product Docs 📚

- [MVP & Blue Ocean Strategy](docs/mvp-blue-ocean.md)
- [Product Review (Good, Bad, Ugly)](docs/product-review.md)

## License 📄

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for full terms.

## Contributing 🤝

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the [GPLv3](LICENSE) license terms.
