const express = require('express');
const {
    connectDB,
    getDB
} = require('./mongobase');
const app = express();
const port = 3000;

// Configuración CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Conecta con MongoDB al iniciar el servidor
connectDB().then(() => {
    console.log('Servidor backend conectado a MongoDB');
}).catch((err) => {
    console.error('Error al conectar con MongoDB:', err);
});

// Endpoint para obtener la colección de platos
app.get('/mesas', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('mesas');
        const mesas = await collection.find({}).toArray();
        res.json(mesas);
    } catch (err) {
        console.error('Error al obtener la colección de mesas:', err);
        res.status(500).json({
            error: 'Error al obtener la colección de mesas'
        });
    }
});

// Otros endpoints aquí...
// Endpoint para reservar una mesa
app.put('/reservar-mesa/:numero_mesa', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('mesas');
        const numeroMesa = req.params.numero_mesa;
        // Actualizar el estado de la mesa a 'reservada'
        await collection.updateOne({ numero: parseInt(numeroMesa) }, { $set: { estado: 'reservada' } });
        res.status(200).json({ message: `Mesa ${numeroMesa} reservada correctamente` });
    } catch (err) {
        console.error('Error al reservar la mesa:', err);
        res.status(500).json({ error: 'Error al reservar la mesa' });
    }
});

// Endpoint para liberar una mesa
app.put('/liberar-mesa/:numero_mesa', async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection('mesas');
        const numeroMesa = req.params.numero_mesa;
        // Actualizar el estado de la mesa a 'libre'
        await collection.updateOne({ numero: parseInt(numeroMesa) }, { $set: { estado: 'libre' } });
        res.status(200).json({ message: `Mesa ${numeroMesa} liberada correctamente` });
    } catch (err) {
        console.error('Error al liberar la mesa:', err);
        res.status(500).json({ error: 'Error al liberar la mesa' });
    }
});

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://10.0.2.2:${port}`);
});