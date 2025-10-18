import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  sizes: string[];
}

interface CartItem extends Product {
  size: string;
  quantity: number;
}

const products: Product[] = [];

const sizeGuide = {
  'XS': { bust: '78-82', waist: '58-62', hips: '86-90' },
  'S': { bust: '82-86', waist: '62-66', hips: '90-94' },
  'M': { bust: '86-90', waist: '66-70', hips: '94-98' },
  'L': { bust: '90-96', waist: '70-76', hips: '98-104' },
  'XL': { bust: '96-102', waist: '76-82', hips: '104-110' }
};

export default function Index() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizeForProduct, setSelectedSizeForProduct] = useState<string>('');
  const { toast } = useToast();

  const addToCart = (product: Product, size: string) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
    
    toast({
      title: "Добавлено в корзину",
      description: `${product.name}, размер ${size}`,
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart(cart.map(item => 
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl tracking-[0.2em] font-light">OUTLET</h1>
            <nav className="flex items-center gap-8 md:gap-12 text-sm tracking-wider">
              <button onClick={() => navigate('/catalog')} className="hover:opacity-60 transition-opacity hidden md:block">КАТАЛОГ</button>
              <a href="#collection" className="hover:opacity-60 transition-opacity hidden md:block">КОЛЛЕКЦИЯ</a>
              <a href="#contact" className="hover:opacity-60 transition-opacity hidden md:block">КОНТАКТЫ</a>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative p-2 hover:bg-transparent">
                    <Icon name="ShoppingBag" size={22} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-light tracking-wide">Корзина</SheetTitle>
                  </SheetHeader>
                  
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                      <Icon name="ShoppingBag" size={48} className="text-muted-foreground mb-4" />
                      <p className="text-muted-foreground font-light">Корзина пуста</p>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex-1 overflow-auto py-6 space-y-4">
                        {cart.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex gap-4 py-4 border-b border-border/40">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-24 h-32 object-cover"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-light tracking-wide mb-1">{item.name}</h4>
                                <p className="text-sm text-muted-foreground font-light">Размер: {item.size}</p>
                                <p className="text-sm font-light mt-2">{item.price}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="font-light text-sm w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 ml-auto"
                                  onClick={() => removeFromCart(item.id, item.size)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-border/40 pt-6 space-y-4">
                        <div className="flex justify-between items-center text-lg">
                          <span className="font-light tracking-wide">Итого:</span>
                          <span className="font-light">{cartTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button 
                          className="w-full py-6 text-sm tracking-widest font-light"
                          onClick={() => {
                            toast({
                              title: "Заказ оформлен",
                              description: "Мы свяжемся с вами в ближайшее время",
                            });
                            setCart([]);
                          }}
                        >
                          ОФОРМИТЬ ЗАКАЗ
                        </Button>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl lg:text-8xl mb-6 font-light">
            Вневременная<br />элегантность
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
            Коллекция премиальной одежды, созданная из лучших натуральных тканей
          </p>
        </div>
      </section>

      <section id="collection" className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-light mb-4">Новая коллекция</h3>
          <p className="text-muted-foreground font-light">Весна/Лето 2025</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-0 bg-transparent animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-light tracking-wide">{product.name}</h4>
                  <p className="text-muted-foreground font-light">{product.price}</p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 font-light tracking-wider text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    ПОДРОБНЕЕ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center space-y-4">
          <Button 
            variant="outline" 
            className="px-8 py-6 text-sm tracking-widest font-light mr-4"
            onClick={() => navigate('/catalog')}
          >
            СМОТРЕТЬ ВСЁ
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-8 py-6 text-sm tracking-widest font-light">
                ГИД ПО РАЗМЕРАМ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-light tracking-wide mb-6">
                  Размерная сетка
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-2 text-center font-light text-sm">
                  <div className="font-medium">Размер</div>
                  <div>Обхват груди (см)</div>
                  <div>Обхват талии (см)</div>
                  <div>Обхват бёдер (см)</div>
                </div>
                {Object.entries(sizeGuide).map(([size, measurements]) => (
                  <div 
                    key={size}
                    className="grid grid-cols-4 gap-2 text-center py-3 border-t border-border/40 text-sm font-light hover:bg-accent/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedSize(size)}
                  >
                    <div className="font-medium">{size}</div>
                    <div>{measurements.bust}</div>
                    <div>{measurements.waist}</div>
                    <div>{measurements.hips}</div>
                  </div>
                ))}
                <div className="bg-muted p-4 mt-6 rounded-none">
                  <p className="text-sm font-light text-muted-foreground">
                    <Icon name="Info" size={16} className="inline mr-2" />
                    Все измерения указаны в сантиметрах. Для точного подбора рекомендуем профессиональные замеры.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section id="contact" className="bg-accent/20 py-24 mt-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-light mb-4">Свяжитесь с нами</h3>
            <p className="text-muted-foreground font-light">Мы ответим в течение 24 часов</p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input 
                  placeholder="Имя" 
                  className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors font-light"
                />
              </div>
              <div>
                <Input 
                  type="email"
                  placeholder="Email" 
                  className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors font-light"
                />
              </div>
            </div>
            <div>
              <Input 
                placeholder="Телефон" 
                className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors font-light"
              />
            </div>
            <div>
              <Textarea 
                placeholder="Сообщение" 
                rows={5}
                className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none font-light"
              />
            </div>
            <div className="text-center pt-4">
              <Button 
                type="submit"
                className="px-12 py-6 text-sm tracking-widest font-light bg-primary text-primary-foreground hover:bg-primary/90"
              >
                ОТПРАВИТЬ
              </Button>
            </div>
          </form>

          <div className="mt-16 grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-light tracking-wide mb-3">Адрес</h4>
              <p className="text-muted-foreground font-light text-sm">
                Москва, ул. Петровка, 15<br />
                Ежедневно 11:00 — 21:00
              </p>
            </div>
            <div>
              <h4 className="font-light tracking-wide mb-3">Контакты</h4>
              <p className="text-muted-foreground font-light text-sm">
                +7 (495) 123-45-67<br />
                info@atelier.ru
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-light">© 2025 Atelier. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}