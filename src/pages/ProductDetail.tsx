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
    name: 'Кашемировое пальто',
    price: '145 000 ₽',
    priceNum: 145000,
    image: 'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/979ed970-2c7b-4ee8-bf4e-2630bdd375c9.jpg',
    images: [
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/979ed970-2c7b-4ee8-bf4e-2630bdd375c9.jpg',
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/81925721-ed5a-4cb5-ba18-d10f869b5cf5.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Элегантное пальто из итальянского кашемира высочайшего качества. Классический крой с минималистичным дизайном создаёт утончённый силуэт. Идеально для межсезонья и прохладных вечеров.',
    composition: '100% кашемир (Италия)',
    care: [
      'Сухая химчистка',
      'Не стирать',
      'Не отбеливать',
      'Хранить на плечиках'
    ],
    details: [
      'Длина изделия: 95 см',
      'Классический прямой крой',
      'Два кармана на молнии',
      'Подкладка из шёлка'
    ]
  },
  {
    id: 2,
    name: 'Шёлковая блуза',
    price: '68 000 ₽',
    priceNum: 68000,
    image: 'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/6d4153b0-59df-4ee5-a5c6-e67be8b00305.jpg',
    images: [
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/6d4153b0-59df-4ee5-a5c6-e67be8b00305.jpg',
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/c616e7d7-8814-49e2-bc0f-ffe4930c843d.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Роскошная блуза из натурального шёлка с элегантным струящимся силуэтом. Универсальная модель для создания изысканных образов. Нежная текстура ткани подчёркивает утончённость стиля.',
    composition: '100% шёлк (Китай)',
    care: [
      'Ручная стирка в холодной воде',
      'Не отжимать',
      'Гладить через ткань',
      'Сушить в горизонтальном положении'
    ],
    details: [
      'Свободный крой',
      'Длина: 68 см',
      'Скрытая застёжка на пуговицах',
      'Удлинённые манжеты'
    ]
  },
  {
    id: 3,
    name: 'Брюки из льна',
    price: '52 000 ₽',
    priceNum: 52000,
    image: 'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/2b5cc0cb-1ad4-4de3-8d9a-762fbe40b7e0.jpg',
    images: [
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/2b5cc0cb-1ad4-4de3-8d9a-762fbe40b7e0.jpg',
      'https://cdn.poehali.dev/projects/716d89dc-4a32-4ce1-9453-48cb4fe25d70/files/198d430c-c1ff-4fe6-ba85-d381293c02dd.jpg'
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Лёгкие брюки из европейского льна премиум-качества. Комфортная посадка и естественная фактура ткани создают непринуждённый элегантный образ. Идеальны для тёплого сезона.',
    composition: '100% лён (Франция)',
    care: [
      'Машинная стирка при 30°C',
      'Не отбеливать',
      'Гладить с паром',
      'Можно химчистка'
    ],
    details: [
      'Высокая посадка',
      'Прямой крой',
      'Два боковых кармана',
      'Потайная молния сбоку'
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
            <h1 className="text-2xl tracking-[0.2em] font-light">ATELIER</h1>
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
