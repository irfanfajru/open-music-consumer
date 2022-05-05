class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const playlist = await this._playlistsService.getPlaylistInfo(playlistId);
      const songs = await this._playlistsService.getPlaylistSongs(playlistId);
      const content = {
        playlist: {
          ...playlist,
          songs,
        },
      };
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(content));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = Listener;
