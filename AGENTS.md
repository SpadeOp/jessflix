<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# JessFlix Project Reference

## Credentials (saved in memory/knowledge graph)
- **TMDB API Key**: stored
- **GitHub PAT**: stored
- **Vercel Token**: stored

## URLs
- **GitHub**: https://github.com/SpadeOp/jessflix
- **Vercel**: https://jessflix-tau.vercel.app (team: spadeops-projects)

## APIs Used
- **TMDB**: https://api.themoviedb.org/3 (images: https://image.tmdb.org/t/p/)
- **Vidking Player**: https://www.vidking.net/embed/movie/{id} or /embed/tv/{id}/{season}/{episode}
  - Params: color, autoPlay, nextEpisode, episodeSelector, progress

## Deploy Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Deploy: `npx vercel deploy --token "vcp_..." --yes --prod`
