const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/[/]/g, "-");
};

module.exports = {
  formatDate,
};
