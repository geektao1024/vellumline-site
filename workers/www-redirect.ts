export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    url.hostname = 'vellumline.app';
    return Response.redirect(url.toString(), 308);
  },
};
