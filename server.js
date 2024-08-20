const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your sandbox credentials
const apiKey = 'key_live_MTH2GDBR4ix66rudnakP2xhVIgJuPf8M';
const accessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKdWFYTm9ZVzUwYTJoaGRISnBNRGsxUUdkdFlXbHNMbU52YlNJc0ltRndhVjlyWlhraU9pSnJaWGxmYkdsMlpWOU5WRWd5UjBSQ1VqUnBlRFkyY25Wa2JtRnJVREo0YUZaSlowcDFVR1k0VFNJc0ltbHpjeUk2SW1Gd2FTNXpZVzVrWW05NExtTnZMbWx1SWl3aVpYaHdJam94TnpVME16QTBNemcxTENKcGJuUmxiblFpT2lKU1JVWlNSVk5JWDFSUFMwVk9JaXdpYVdGMElqb3hOekl5TnpZNE16ZzFmUS56NXdsckdZODcwOU9rZnZwaGNRUlhmNjZ3bFFlTjluOXRuN3loUi01VERnRy1Cc1hGVEhBcjdVU1N6RkxBdnZkcTB3RTRoaFA5ZmxNaWxUcEpidjhzdyIsInN1YiI6Im5pc2hhbnRraGF0cmkwOTVAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlX01USDJHREJSNGl4NjZydWRuYWtQMnhoVklnSnVQZjhNIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MjI4NTQ3ODUsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTcyMjc2ODM4NX0.EBzcEyZ3cDNoA2s-jqbmaTGSy6e48XsbJ3lge4s98k7LtVJmU8PbK4XPMftuY09yOS4r6s1HO4N0j7FV4lSUvA';

// Endpoint to fetch bank name using VPA
app.get('/vpa/:vpa', async (req, res) => {
    const { vpa } = req.params;

    const options = {
        method: 'GET',
        url: `https://api.sandbox.co.in/bank/upi/${vpa}`,
        headers: {
            accept: 'application/json',
            authorization: accessToken,
            'x-api-key': apiKey,
        },
    };

    try {
        const response = await axios.request(options);
        const nameAtBank = response.data.data.name_at_bank;
        console.log(nameAtBank);
        res.status(200).json({ nameAtBank });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch bank details',
            error: error.response ? error.response.data : error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
