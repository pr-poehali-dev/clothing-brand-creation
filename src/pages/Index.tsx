import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { CartSheet } from '@/components/CartSheet';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  sizes: string[];
}



const products: Product[] = [
  {
    id: 1,
    name: 'Футболка BAPE Camo',
    price: '4 900 ₽',
    priceNum: 4900,
    image: 'https://cdn.poehali.dev/files/e93cfdd8-462a-4736-b0c1-2aee55c5e9bc.jpg',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'Футболка BAPE x Mastermind',
    price: '4 500 ₽',
    priceNum: 4500,
    image: 'https://cdn.poehali.dev/files/448a49f8-2847-4053-916f-8c427b4928fa.png',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'Лонгслив BAPE x Mastermind',
    price: '7 600 ₽',
    priceNum: 7600,
    image: 'https://cdn.poehali.dev/files/a84dcbde-dac1-4f21-8996-1a46d5acda8c.png',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'Кофта BAPE',
    price: '14 990 ₽',
    priceNum: 14990,
    image: 'https://cdn.poehali.dev/files/5a35657d-4005-4171-bfb7-ce8dc0355b6b.jpg',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizeForProduct, setSelectedSizeForProduct] = useState<string>('');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl tracking-[0.2em] font-light">OUTLET</h1>
            <nav className="flex items-center gap-8 md:gap-12 text-sm tracking-wider">
              <button onClick={() => navigate('/catalog')} className="hover:opacity-60 transition-opacity hidden md:block">КАТАЛОГ</button>
              <a href="#contact" className="hover:opacity-60 transition-opacity hidden md:block">КОНТАКТЫ</a>
              <CartSheet />
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

      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-light mb-4">Наши товары</h3>
          <p className="text-muted-foreground font-light">Премиум японский стритвир</p>
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