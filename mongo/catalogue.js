db = db.getSiblingDB('catalogue');

if (!db.getCollectionNames().includes('products')) {
  db.createCollection('products');
  print('Created products collection');
} else {
  print('Products collection already exists');
}

const existingIndexes = db.products.getIndexes().map(i => i.name);

if (!existingIndexes.includes('name_text_description_text')) {
  db.products.createIndex(
    { name: "text", description: "text" }
  );
  print('Created text index on "name" and "description"');
} else {
  print('Text index already exists, skipping.');
}

if (!existingIndexes.includes('sku_1')) {
  db.products.createIndex(
    { sku: 1 },
    { unique: true }
  );
  print('Created unique index on "sku"');
} else {
  print('Unique index on "sku" already exists, skipping.');
}

const products = [
  { sku: 'Watson', name: 'Watson', description: 'Probably the smartest AI on the planet', price: 2001, instock: 2, categories: ['Artificial Intelligence'] },
  { sku: 'Ewooid', name: 'Ewooid', description: 'Fully sentient assistant', price: 200, instock: 0, categories: ['Artificial Intelligence'] },
  { sku: 'HPTD', name: 'High-Powered Travel Droid', description: 'Traveling to the far reaches of the Galaxy? You need this for protection. Comes in handy when you are lost in space', price: 1200, instock: 12, categories: ['Robot'] },
  { sku: 'UHJ', name: 'Ultimate Harvesting Juggernaut', description: 'Extraterrestrial vegetation harvester', price: 5000, instock: 10, categories: ['Robot'] },
  { sku: 'EPE', name: 'Extreme Probe Emulator', description: 'Versatile interface adapter for hacking into systems', price: 953, instock: 1, categories: ['Robot'] },
  { sku: 'EMM', name: 'Exceptional Medical Machine', description: 'Fully automatic surgery droid with exceptional bedside manner', price: 1024, instock: 1, categories: ['Robot'] },
  { sku: 'SHCE', name: 'Strategic Human Control Emulator', description: 'Diplomatic protocol assistant', price: 300, instock: 12, categories: ['Robot'] },
  { sku: 'RED', name: 'Responsive Enforcer Droid', description: 'Security detail, will guard anything', price: 700, instock: 5, categories: ['Robot'] },
  { sku: 'RMC', name: 'Robotic Mining Cyborg', description: 'Excellent tunneling capability to get those rare minerals', price: 42, instock: 48, categories: ['Robot'] },
  { sku: 'STAN-1', name: 'Stan', description: 'Observability guru', price: 67, instock: 1000, categories: ['Robot', 'Artificial Intelligence'] },
  { sku: 'CNA', name: 'Cybernated Neutralization Android', description: 'Is your spaceship a bit whiffy? This little fellow will bring a breath of fresh air', price: 1000, instock: 0, categories: ['Robot'] },
];

products.forEach(product => {
  const result = db.products.updateOne(
    { sku: product.sku },
    { $set: product },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    print(`Inserted product: ${product.sku}`);
  } else if (result.matchedCount > 0) {
    print(`Updated existing product: ${product.sku}`);
  }
});