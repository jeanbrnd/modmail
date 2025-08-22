const enUS = {
  messages: {
    ticketClosedBy: "✅ | Your ticket has been closed by: <@{{user}}>!",
    ticketCreate: "Hello <@{{author}}>, your ticket has been successfully created!"
  },
  errors: {
    notPermission: "❌ | You do not have permission to use this command.",
    userNotFound: "❌ | User not found.",
    serverNotFound: "❌ | The specified server was not found.",
    channelNotFound: "❌ | Your ticket channel was not found and has been deleted. Please try again.",
    ticketNotFound: "❌ | Ticket not found. Please delete the channel manually!",
    ticketCreate: "❌ | Failed to create the ticket channel."
  },
  menus: {
    config: {
      main: {
        title: "⚙️ ModMail Settings",
        greeting: "👋 Hello <@{{member}}>, welcome to the settings! Below are the available options:",
        sections: {
          guild: {
            title: "Server:",
            description: "Select the server where the bot will work",
            placeholder: "Select a server"
          },
          category: {
            title: "Category:",
            description: "Select the category where tickets will be opened",
            placeholder: "Select a category"
          },
          channel: {
            title: "Notification Channel:",
            description: "Select the channel where admins will receive notifications",
            placeholder: "Select a channel"
          },
          role: {
            title: "Administrator Role:",
            description: "Select the role that will have permission to edit/view tickets",
            placeholder: "Select a role"
          }
        }
      }
    },
    ticket: {
      main: {
        title: "🎟️ Support Ticket - {{userDisplay}}",
        createdBy: "**Created by:** {{username}} ({{id}})",
        subject: "**Subject:** {{content}}",
        creationDate: "**Created on:** <t:{{timestamp}}:f>",
        closeButton: "Close Ticket"
      }
    }
  },
} as const;

export default enUS;