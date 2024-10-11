const { Book, User, Borrow } = require('../models');

exports.borrowBook = async (req, res) => {
  const { portfolioId, shareSymbol, quantity } = req.body;

  try {
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(400).json({ message: 'Portfolio not found' });
    }

    const share = await Share.findOne({ where: { symbol: shareSymbol } });
    if (!share) {
      return res.status(400).json({ message: 'Share not found' });
    }

    const transaction = await Transaction.create({
      type: 'BUY',
      quantity,
      sharePrice: share.price,
      PortfolioId: portfolio.id,
      ShareId: share.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBook = async (req, res) => {
  const { portfolioId, shareSymbol, quantity } = req.body;

  try {
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(400).json({ message: 'Portfolio not found' });
    }

    const share = await Share.findOne({ where: { symbol: shareSymbol } });
    if (!share) {
      return res.status(400).json({ message: 'Share not found' });
    }

    const transactions = await Transaction.findAll({
      where: { PortfolioId: portfolio.id, ShareId: share.id },
    });

    const totalBought = transactions
      .filter(t => t.type === 'BUY')
      .reduce((sum, t) => sum + t.quantity, 0);
    const totalSold = transactions
      .filter(t => t.type === 'SELL')
      .reduce((sum, t) => sum + t.quantity, 0);
    const availableQuantity = totalBought - totalSold;

    if (availableQuantity < quantity) {
      return res.status(400).json({ message: 'Insufficient shares to sell' });
    }

    const transaction = await Transaction.create({
      type: 'SELL',
      quantity,
      sharePrice: share.price,
      PortfolioId: portfolio.id,
      ShareId: share.id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};