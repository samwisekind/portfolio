const errorHandler = require('../helpers/errorHandler');

const showIndex = async (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    const { status, message } = errorHandler(error);
    res.status(status).json({ message });
  }
};

module.exports = {
  showIndex,
};
