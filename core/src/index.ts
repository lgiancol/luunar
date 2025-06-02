import app from "./app";

const PORT = process.env.PORT || 6501;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
