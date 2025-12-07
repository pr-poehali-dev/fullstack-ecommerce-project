import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 129990, category: 'Смартфоны', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', badge: 'Хит' },
    { id: 2, name: 'AirPods Pro (2nd gen)', price: 24990, category: 'Аудио', image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400', badge: 'Новинка' },
    { id: 3, name: 'MacBook Pro 14"', price: 219990, category: 'Ноутбуки', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
    { id: 4, name: 'Apple Watch Ultra 2', price: 89990, category: 'Умные часы', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400', badge: 'Топ' },
    { id: 5, name: 'iPad Pro 12.9"', price: 119990, category: 'Планшеты', image: 'https://images.unsplash.com/photo-1585790050230-5dd28404f27f?w=400' },
    { id: 6, name: 'Samsung Galaxy Z Fold 5', price: 159990, category: 'Смартфоны', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', badge: 'Новинка' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-purple-pink flex items-center justify-center glow-primary">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold gradient-text">TechStore</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" size="icon" className="relative gradient-purple-pink">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 gradient-orange-pink border-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина ({cartCount})</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-primary font-bold mt-1">{item.price.toLocaleString('ru-RU')} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 ml-auto text-destructive"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold gradient-text">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full gradient-purple-pink text-white font-semibold" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-purple-pink opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 gradient-orange-pink border-0 text-white">Новинки 2024</Badge>
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 gradient-text">
              Будущее технологий<br />уже здесь
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Эксклюзивная коллекция гаджетов для технолюбителей. Инновации, которые меняют жизнь.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-purple-pink text-white font-semibold glow-primary">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50">
                <Icon name="Gift" size={20} className="mr-2" />
                Акции
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-heading font-bold mb-2">Популярные товары</h3>
              <p className="text-muted-foreground">Выбор технолюбителей со всего мира</p>
            </div>
            <div className="relative w-full md:w-80">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск товаров..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 gradient-orange-pink border-0 text-white">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold gradient-text">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full gradient-purple-pink text-white font-semibold"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-primary/20 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full gradient-purple-pink mx-auto mb-4 flex items-center justify-center glow-primary">
                <Icon name="Truck" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-heading font-bold mb-2">Быстрая доставка</h4>
              <p className="text-muted-foreground">Доставим за 1-2 дня по всей России</p>
            </Card>

            <Card className="text-center p-8 border-secondary/20 hover:border-secondary/50 transition-colors">
              <div className="w-16 h-16 rounded-full gradient-orange-pink mx-auto mb-4 flex items-center justify-center glow-secondary">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-heading font-bold mb-2">Гарантия качества</h4>
              <p className="text-muted-foreground">Официальная гарантия на все товары</p>
            </Card>

            <Card className="text-center p-8 border-accent/20 hover:border-accent/50 transition-colors">
              <div className="w-16 h-16 rounded-full gradient-purple-pink mx-auto mb-4 flex items-center justify-center">
                <Icon name="Headphones" size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-heading font-bold mb-2">Поддержка 24/7</h4>
              <p className="text-muted-foreground">Всегда на связи для помощи</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-purple-pink flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-heading font-bold gradient-text">TechStore</h1>
              </div>
              <p className="text-sm text-muted-foreground">Магазин электроники и гаджетов для технолюбителей</p>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Каталог</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Смартфоны</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ноутбуки</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Аудио</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Умные часы</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Информация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@techstore.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>Москва, ул. Тверская, 1</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 TechStore. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;