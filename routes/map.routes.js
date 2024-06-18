const { Router } = require("express");
const readChannelMessage = require("../tg-reader");

const router = Router();

router.get('/data', async (req, res) => {
    try {
        const messages = await readChannelMessage();

        res.status(200).json({ points: messages, filters: [] });
    } catch (err) {
        res.status(500).json({ message: 'Some error, try again' });
    }
});

module.exports = router;