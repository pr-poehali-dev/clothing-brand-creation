import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  size: string;
  quantity: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const cartItems = (location.state?.cart as CartItem[]) || [];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    paymentMethod: 'card'
  });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  const deliveryFee = cartTotal >= 10000 ? 0 : 500;
  const totalWithDelivery = cartTotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, укажите все данные для доставки",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Заказ оформлен!",
      description: `Сумма к оплате: ${totalWithDelivery.toLocaleString('ru-RU')} ₽`,
    });
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-light mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground font-light mb-6">Добавьте товары для оформления заказа</p>
          <Button onClick={() => navigate('/catalog')}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl tracking-[0.2em] font-light hover:opacity-60 transition-opacity"
            >
              OUTLET
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-light mb-12 text-center">Оформление заказа</h1>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-light tracking-wide flex items-center gap-2">
                    <Icon name="User" size={20} />
                    Контактные данные
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-light">Имя *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Иван"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-light">Фамилия *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Иванов"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-light">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-light">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@mail.ru"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-light tracking-wide flex items-center gap-2">
                    <Icon name="MapPin" size={20} />
                    Адрес доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-light">Город *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Москва"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-light">Адрес доставки *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="ул. Ленина, д. 1, кв. 1"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-light tracking-wide flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    Способ оплаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                  >
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-light cursor-pointer flex-1">
                        Банковская карта
                      </Label>
                      <Icon name="CreditCard" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="font-light cursor-pointer flex-1">
                        Наличными при получении
                      </Label>
                      <Icon name="Wallet" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                      <RadioGroupItem value="sbp" id="sbp" />
                      <Label htmlFor="sbp" className="font-light cursor-pointer flex-1">
                        СБП (Система быстрых платежей)
                      </Label>
                      <Icon name="Smartphone" size={20} className="text-muted-foreground" />
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-light text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Размер: {item.size}</p>
                        <p className="text-xs text-muted-foreground">Кол-во: {item.quantity}</p>
                        <p className="text-sm font-light mt-1">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-light">
                    <span>Товары ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                    <span>{cartTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm font-light">
                    <span>Доставка</span>
                    <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                  </div>
                  {cartTotal < 10000 && (
                    <p className="text-xs text-muted-foreground">
                      До бесплатной доставки: {(10000 - cartTotal).toLocaleString('ru-RU')} ₽
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-light">
                  <span>Итого:</span>
                  <span>{totalWithDelivery.toLocaleString('ru-RU')} ₽</span>
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full py-6 text-sm tracking-widest font-light"
                >
                  ОФОРМИТЬ ЗАКАЗ
                </Button>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Shield" size={16} />
                    <span>Безопасная оплата</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Truck" size={16} />
                    <span>Доставка 1-3 дня</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="RotateCcw" size={16} />
                    <span>Возврат в течение 14 дней</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
