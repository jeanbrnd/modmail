const ptBR = {
  messages: {
    ticketClosedBy: "✅ | Seu ticket foi encerrado por: <@{{user}}>!",
    ticketCreate: "Olá <@{{author}}>, seu ticket foi criado com sucesso!"
  },
  errors: {
    notPermission: "❌ | Você não tem permissão para utilizar este comando.",
    userNotFound: "❌ | Usuário não foi encontrado.",
    serverNotFound: "❌ | O servidor definido não foi encontrado.",
    channelNotFound: "❌ | O canal do seu ticket não foi encontrado e foi excluído. Tente novamente.",
    ticketNotFound: "❌ | O ticket não foi encontrado. Exclua o canal manualmente!",
    ticketCreate: "❌ | Não foi possível criar o canal do ticket."
  },
  menus: {
    config: {
      main: {
        title: "⚙️ Configurações do ModMail",
        greeting: "👋 Olá <@{{member}}>, seja bem-vindo às configurações! Veja abaixo as opções de alteração:",
        sections: {
          guild: {
            title: "Servidor:",
            description: "Defina o servidor em que o bot irá funcionar",
            placeholder: "Selecione um servidor"
          },
          category: {
            title: "Categoria:",
            description: "Defina a categoria onde os tickets serão abertos",
            placeholder: "Selecione uma categoria"
          },
          channel: {
            title: "Canal de Notificações:",
            description: "Defina o canal onde os administradores receberão notificações",
            placeholder: "Selecione um canal"
          },
          role: {
            title: "Cargo de Administrador:",
            description: "Defina o cargo que terá permissão para editar/visualizar tickets",
            placeholder: "Selecione um cargo"
          }
        }
      }
    },
    ticket: {
      main: {
        title: "🎟️ Ticket de Suporte - {{userDisplay}}",
        createdBy: "**Criado por:** {{username}} ({{id}})",
        subject: "**Assunto:** {{content}}",
        creationDate: "**Data de Criação:** <t:{{timestamp}}:f>",
        closeButton: "Encerrar Ticket"
      }
    }
  },
} as const;

export default ptBR;