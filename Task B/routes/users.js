const express = require('express');
const { Op } = require('sequelize');
const User = require('../models/user');
const Company = require('../models/company');

const router = express.Router();

// Get users by companyId
router.get('/:companyId', async (req, res) => {
  const { companyId } = req.params;

  try {
    const users = await User.findAll({
      where: { companyId },
      include: Company,
    });

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
