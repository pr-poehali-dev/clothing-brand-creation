import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';

export function CartSheet() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
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
                onClick={() => navigate('/checkout')}
              >
                ОФОРМИТЬ ЗАКАЗ
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
