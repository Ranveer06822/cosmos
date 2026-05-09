import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory "database" (This lives as long as the server is running)
  // For production, you'd use a real database.
  const bookings: any[] = [];

  // API Route to handle bookings
  app.post("/api/book", (req, res) => {
    const { name, phone, ticketTier } = req.body;
    
    if (!name || !phone || !ticketTier) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = {
      id: Date.now(),
      name,
      phone,
      ticketTier,
      timestamp: new Date().toISOString()
    };

    bookings.push(newBooking);
    
    // Log to console so you can see it in the terminal
    console.log("!!! NEW BOOKING RECEIVED !!!");
    console.log(newBooking);
    
    res.status(201).json({ message: "Booking received successfully!", booking: newBooking });
  });

  // API to see all bookings (for the admin)
  app.get("/api/admin/bookings", (req, res) => {
    res.json(bookings);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cosmos Server running at http://localhost:${PORT}`);
  });
}

startServer();
