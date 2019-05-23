export default {
  loadChunk:
    process.env.NODE_ENV === "test" ? () => {} : __webpack_chunk_load__,
  require: process.env.NODE_ENV === "test" ? () => {} : __webpack_require__
};
