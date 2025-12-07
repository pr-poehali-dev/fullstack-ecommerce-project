import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  badge?: string;
  description: string;
  specs: { label: string; value: string }[];
  inStock: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 129990,
      category: 'Смартфоны',
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        'https://images.unsplash.com/photo-1695048133092-5a8f57c98b14?w=800',
        'https://images.unsplash.com/photo-1695048133526-3b1b0d2f6c31?w=800',
        'https://images.unsplash.com/photo-1695048117832-10e5c19ac5ba?w=800',
      ],
      badge: 'Хит',
      description: 'iPhone 15 Pro Max — мощнейший смартфон с титановым корпусом, процессором A17 Pro и потрясающей камерой 48MP. Революционный дисплей Super Retina XDR с технологией ProMotion и частотой обновления 120 Гц обеспечивает невероятно плавную прокрутку.',
      specs: [
        { label: 'Процессор', value: 'Apple A17 Pro' },
        { label: 'Память', value: '256GB' },
        { label: 'Дисплей', value: '6.7" Super Retina XDR' },
        { label: 'Камера', value: '48MP + 12MP + 12MP' },
        { label: 'Батарея', value: '4441 mAh' },
      ],
      inStock: true,
    },
    {
      id: 2,
      name: 'AirPods Pro (2nd gen)',
      price: 24990,
      category: 'Аудио',
      images: [
        'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
        'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800',
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800',
      ],
      badge: 'Новинка',
      description: 'AirPods Pro второго поколения с активным шумоподавлением нового уровня. Адаптивный звук, персонализированное пространственное аудио и до 6 часов прослушивания с одной зарядки.',
      specs: [
        { label: 'Активное шумоподавление', value: 'Да' },
        { label: 'Прозрачный режим', value: 'Адаптивный' },
        { label: 'Время работы', value: 'До 6 часов' },
        { label: 'Чип', value: 'Apple H2' },
        { label: 'Защита', value: 'IPX4' },
      ],
      inStock: true,
    },
    {
      id: 3,
      name: 'MacBook Pro 14"',
      price: 219990,
      category: 'Ноутбуки',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
      ],
      description: 'MacBook Pro 14" с чипом M3 Pro — невероятная производительность для профессионалов. Liquid Retina XDR дисплей, до 18 часов автономной работы и революционная архитектура чипа.',
      specs: [
        { label: 'Процессор', value: 'Apple M3 Pro' },
        { label: 'Память', value: '18GB RAM' },
        { label: 'Накопитель', value: '512GB SSD' },
        { label: 'Дисплей', value: '14.2" Liquid Retina XDR' },
        { label: 'Батарея', value: 'До 18 часов' },
      ],
      inStock: true,
    },
    {
      id: 4,
      name: 'Apple Watch Ultra 2',
      price: 89990,
      category: 'Умные часы',
      images: [
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
        'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800',
      ],
      badge: 'Топ',
      description: 'Apple Watch Ultra 2 создан для экстремальных условий. Титановый корпус, яркий дисплей до 3000 нит, GPS двух диапазонов и водонепроницаемость до 100 метров.',
      specs: [
        { label: 'Дисплей', value: '49mm Retina' },
        { label: 'Яркость', value: 'До 3000 нит' },
        { label: 'Защита', value: '100m водонепроницаемость' },
        { label: 'Батарея', value: 'До 36 часов' },
        { label: 'GPS', value: 'Двухдиапазонный' },
      ],
      inStock: true,
    },
    {
      id: 5,
      name: 'iPad Pro 12.9"',
      price: 119990,
      category: 'Планшеты',
      images: [
        'https://images.unsplash.com/photo-1585790050230-5dd28404f27f?w=800',
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800',
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      ],
      description: 'iPad Pro 12.9" с чипом M2 и дисплеем Liquid Retina XDR. Профессиональная производительность, поддержка Apple Pencil и Magic Keyboard.',
      specs: [
        { label: 'Процессор', value: 'Apple M2' },
        { label: 'Память', value: '8GB RAM' },
        { label: 'Накопитель', value: '256GB' },
        { label: 'Дисплей', value: '12.9" Liquid Retina XDR' },
        { label: 'Камера', value: '12MP + 10MP' },
      ],
      inStock: true,
    },
    {
      id: 6,
      name: 'Samsung Galaxy Z Fold 5',
      price: 159990,
      category: 'Смартфоны',
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
      ],
      badge: 'Новинка',
      description: 'Samsung Galaxy Z Fold 5 — складной смартфон будущего. Основной экран 7.6", процессор Snapdragon 8 Gen 2 и улучшенная конструкция шарнира Flex.',
      specs: [
        { label: 'Процессор', value: 'Snapdragon 8 Gen 2' },
        { label: 'Память', value: '12GB RAM' },
        { label: 'Дисплей', value: '7.6" + 6.2" AMOLED' },
        { label: 'Камера', value: '50MP + 12MP + 10MP' },
        { label: 'Батарея', value: '4400 mAh' },
      ],
      inStock: true,
    },
  ];

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-lg gradient-purple-pink flex items-center justify-center glow-primary">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold gradient-text">TechStore</h1>
          </div>

          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к каталогу
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Card className="overflow-hidden animate-scale-in">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <Badge className="absolute top-4 right-4 gradient-orange-pink border-0 text-white">
                      {product.badge}
                    </Badge>
                  )}
                  {product.inStock && (
                    <Badge className="absolute top-4 left-4 bg-green-500 border-0 text-white">
                      В наличии
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? 'ring-2 ring-primary scale-105'
                      : 'hover:scale-105 opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square">
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            <div>
              <Badge variant="secondary" className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-heading font-bold mb-4 gradient-text">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Icon key={star} name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(248 отзывов)</span>
              </div>
              <p className="text-5xl font-bold gradient-text mb-6">{product.price.toLocaleString('ru-RU')} ₽</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Количество:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={18} />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 gradient-purple-pink text-white font-semibold glow-primary" size="lg">
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>

              <Button variant="secondary" className="w-full" size="lg">
                <Icon name="Zap" size={20} className="mr-2" />
                Купить в 1 клик
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Icon name="Truck" size={20} className="text-primary" />
                <span>Бесплатная доставка по России</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="Shield" size={20} className="text-primary" />
                <span>Официальная гарантия 1 год</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Icon name="RefreshCw" size={20} className="text-primary" />
                <span>Возврат в течение 14 дней</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                        <span className="font-semibold">{spec.label}</span>
                        <span className="text-muted-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
