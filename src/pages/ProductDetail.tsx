import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  images: string[];
  sizes: string[];
  description: string;
  composition: string;
  care: string[];
  details: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'Футболка BAPE Camo',
    price: '4 900 ₽',
    priceNum: 4900,
    image: 'https://cdn.poehali.dev/files/e93cfdd8-462a-4736-b0c1-2aee55c5e9bc.jpg',
    images: [
      'https://cdn.poehali.dev/files/e93cfdd8-462a-4736-b0c1-2aee55c5e9bc.jpg',
      'https://cdn.poehali.dev/files/e93cfdd8-462a-4736-b0c1-2aee55c5e9bc.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Оригинальная футболка BAPE с культовым камуфляжным принтом. Легендарный японский стритвир в классическом исполнении. Идеально для создания смелых городских образов.',
    composition: '100% хлопок премиум-качества',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при низкой температуре',
      'Стирать наизнанку'
    ],
    details: [
      'Классический прямой крой',
      'Плотная ткань 180 г/м²',
      'Принт методом шелкографии',
      'Оригинальная бирка BAPE'
    ]
  },
  {
    id: 2,
    name: 'Футболка BAPE x Mastermind',
    price: '4 500 ₽',
    priceNum: 4500,
    image: 'https://cdn.poehali.dev/files/448a49f8-2847-4053-916f-8c427b4928fa.png',
    images: [
      'https://cdn.poehali.dev/files/448a49f8-2847-4053-916f-8c427b4928fa.png',
      'https://cdn.poehali.dev/files/448a49f8-2847-4053-916f-8c427b4928fa.png'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Эксклюзивная коллаборация BAPE x Mastermind Japan. Белая футболка с культовым принтом черепа и костей. Японский стритвир премиум-класса.',
    composition: '100% хлопок премиум-качества',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при низкой температуре',
      'Стирать наизнанку'
    ],
    details: [
      'Коллаборация BAPE x Mastermind',
      'Плотная ткань 180 г/м²',
      'Принт методом шелкографии',
      'Оригинальные бирки обоих брендов'
    ]
  },
  {
    id: 3,
    name: 'Лонгслив BAPE x Mastermind',
    price: '7 600 ₽',
    priceNum: 7600,
    image: 'https://cdn.poehali.dev/files/a84dcbde-dac1-4f21-8996-1a46d5acda8c.png',
    images: [
      'https://cdn.poehali.dev/files/a84dcbde-dac1-4f21-8996-1a46d5acda8c.png',
      'https://cdn.poehali.dev/files/a84dcbde-dac1-4f21-8996-1a46d5acda8c.png'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Чёрный лонгслив из легендарной коллаборации BAPE x Mastermind Japan. Белый принт с черепом и логотипом. Эксклюзивный японский стритвир для истинных ценителей.',
    composition: '100% хлопок премиум-качества',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при низкой температуре',
      'Стирать наизнанку'
    ],
    details: [
      'Эксклюзивная коллаборация',
      'Плотная ткань 220 г/м²',
      'Длинные рукава с манжетами',
      'Принт методом шелкографии',
      'Оригинальные бирки BAPE x Mastermind'
    ]
  },
  {
    id: 4,
    name: 'Кофта BAPE',
    price: '14 990 ₽',
    priceNum: 14990,
    image: 'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/a37d001e-94b3-4e95-85d5-6a8ec1e6bbb5.jpg',
    images: [
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/a37d001e-94b3-4e95-85d5-6a8ec1e6bbb5.jpg',
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/a37d001e-94b3-4e95-85d5-6a8ec1e6bbb5.jpg'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Классическая кофта BAPE с легендарным логотипом. Премиум японский стритвир для истинных ценителей бренда. Мягкая ткань и удобный крой.',
    composition: '80% хлопок, 20% полиэстер премиум-качества',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить при низкой температуре',
      'Стирать наизнанку'
    ],
    details: [
      'Оригинальный логотип BAPE',
      'Плотная тёплая ткань 300 г/м²',
      'Классический крой с капюшоном',
      'Карман-кенгуру спереди',
      'Оригинальная бирка BAPE'
    ]
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground font-light mb-4">Товар не найден</p>
          <Button variant="outline" onClick={() => navigate('/')}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Выберите размер",
        description: "Пожалуйста, выберите размер перед добавлением в корзину",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Добавлено в корзину",
      description: `${product.name}, размер ${selectedSize}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="text-sm tracking-wider font-light">НАЗАД</span>
            </button>
            <h1 className="text-2xl tracking-[0.2em] font-light">OUTLET</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden animate-fade-in">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-[3/4] overflow-hidden transition-opacity ${
                      selectedImage === idx ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-4">{product.name}</h2>
              <p className="text-2xl font-light text-muted-foreground">{product.price}</p>
            </div>

            <Separator />

            <div>
              <p className="font-light leading-relaxed text-foreground/90">
                {product.description}
              </p>
            </div>

            <div>
              <p className="text-sm font-light mb-4 text-muted-foreground tracking-wide">ВЫБЕРИТЕ РАЗМЕР</p>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-sm border border-border px-4 py-4 font-light tracking-wider transition-colors hover:border-primary ${
                      selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full py-7 text-sm tracking-widest font-light"
              onClick={addToCart}
            >
              ДОБАВИТЬ В КОРЗИНУ
            </Button>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="composition" className="border-border/40">
                <AccordionTrigger className="font-light tracking-wide hover:no-underline">
                  Состав
                </AccordionTrigger>
                <AccordionContent className="font-light text-muted-foreground">
                  {product.composition}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care" className="border-border/40">
                <AccordionTrigger className="font-light tracking-wide hover:no-underline">
                  Уход
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 font-light text-muted-foreground">
                    {product.care.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="mt-1 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="details" className="border-border/40">
                <AccordionTrigger className="font-light tracking-wide hover:no-underline">
                  Детали
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 font-light text-muted-foreground">
                    {product.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Minus" size={16} className="mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="bg-accent/20 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Icon name="Truck" size={20} className="text-muted-foreground" />
                <p className="font-light text-sm">Бесплатная доставка по Москве</p>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="RotateCcw" size={20} className="text-muted-foreground" />
                <p className="font-light text-sm">Возврат в течение 14 дней</p>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Package" size={20} className="text-muted-foreground" />
                <p className="font-light text-sm">Премиальная упаковка в подарок</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}