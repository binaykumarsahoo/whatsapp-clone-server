const io = require('socket.io')(process.env.PORT || 5000, {
  cors: {
    origins: [
      'http://localhost:3000',
      'https://binaykumarsahoo.github.io/whatsapp-clone-client',
    ],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
