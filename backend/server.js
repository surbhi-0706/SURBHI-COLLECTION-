app.get('/api/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Rose Silk Saree',
      price: 4999,
      category: 'Silk Sarees',
      type: 'Silk',
      stock: 8,
      badge: 'Bestseller',
      image: 'saree1.jpeg',
      description:
        'A graceful silk saree with timeless elegance, perfect for celebrations and special occasions.',
    },
    {
      id: 2,
      name: 'Royal Burgundy',
      price: 5499,
      category: 'Designer Sarees',
      type: 'Designer',
      stock: 5,
      badge: 'New',
      image: 'saree2.jpeg',
      description:
        'A statement designer saree crafted for sophisticated evenings and unforgettable moments.',
    },
    {
      id: 3,
      name: 'Golden Heritage',
      price: 6999,
      category: 'Festive Sarees',
      type: 'Festive',
      stock: 3,
      badge: 'Limited',
      image: 'saree3.jpg',
      description:
        'A rich festive saree inspired by traditional Indian heritage and celebration.',
    },
  ])
})