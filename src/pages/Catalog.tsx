import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  sizes: string[];
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Футболка BAPE Camo',
    price: '4 900 ₽',
    priceNum: 4900,
    image: 'https://cdn.poehali.dev/files/e93cfdd8-462a-4736-b0c1-2aee55c5e9bc.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Футболки'
  },
  {
    id: 2,
    name: 'Футболка BAPE x Mastermind',
    price: '4 500 ₽',
    priceNum: 4500,
    image: 'https://cdn.poehali.dev/files/448a49f8-2847-4053-916f-8c427b4928fa.png',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Футболки'
  }
];

const categories = ['Все', 'Футболки', 'Худи', 'Куртки', 'Брюки', 'Аксессуары'];
const allSizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function Catalog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [cartCount] = useState(0);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  let filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    return categoryMatch && sizeMatch;
  });

  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.priceNum - a.priceNum);
  }

  const resetFilters = () => {
    setSelectedCategory('Все');
    setSelectedSizes([]);
    setSortBy('default');
  };

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
            <nav className="flex items-center gap-8 md:gap-12 text-sm tracking-wider">
              <a href="/#collection" className="hover:opacity-60 transition-opacity hidden md:block">КОЛЛЕКЦИЯ</a>
              <a href="/#contact" className="hover:opacity-60 transition-opacity hidden md:block">КОНТАКТЫ</a>
              <Button variant="ghost" className="relative p-2 hover:bg-transparent">
                <Icon name="ShoppingBag" size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-light">
                    {cartCount}
                  </span>
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Каталог</h1>
          <p className="text-muted-foreground font-light">Весна/Лето 2025</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <div className="lg:sticky lg:top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-light tracking-wide">Фильтры</h3>
                {(selectedCategory !== 'Все' || selectedSizes.length > 0) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-xs font-light"
                  >
                    Сбросить
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-light mb-3 text-muted-foreground tracking-wide">КАТЕГОРИЯ</p>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left text-sm font-light py-2 px-3 transition-colors hover:bg-accent ${
                          selectedCategory === category ? 'bg-accent' : ''
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-light mb-3 text-muted-foreground tracking-wide">РАЗМЕР</p>
                  <div className="space-y-2">
                    {allSizes.map(size => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox 
                          id={size}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={() => toggleSize(size)}
                        />
                        <label
                          htmlFor={size}
                          className="text-sm font-light cursor-pointer"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full lg:hidden font-light">
                      <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                      Фильтры
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle className="font-light tracking-wide">Фильтры</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div>
                        <p className="text-sm font-light mb-3 text-muted-foreground">КАТЕГОРИЯ</p>
                        <div className="space-y-2">
                          {categories.map(category => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`block w-full text-left text-sm font-light py-2 px-3 transition-colors ${
                                selectedCategory === category ? 'bg-accent' : ''
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-light mb-3 text-muted-foreground">РАЗМЕР</p>
                        <div className="space-y-2">
                          {allSizes.map(size => (
                            <div key={size} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`mobile-${size}`}
                                checked={selectedSizes.includes(size)}
                                onCheckedChange={() => toggleSize(size)}
                              />
                              <label
                                htmlFor={`mobile-${size}`}
                                className="text-sm font-light cursor-pointer"
                              >
                                {size}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm font-light text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товара'}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] font-light">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default" className="font-light">По умолчанию</SelectItem>
                  <SelectItem value="price-asc" className="font-light">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc" className="font-light">Цена: по убыванию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="PackageOpen" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground font-light">Товары не найдены</p>
                <Button 
                  variant="outline" 
                  className="mt-4 font-light"
                  onClick={resetFilters}
                >
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card 
                    key={product.id} 
                    className="group overflow-hidden border-0 bg-transparent animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-light tracking-wider">{product.category}</p>
                        <h4 className="text-base font-light tracking-wide">{product.name}</h4>
                        <p className="text-muted-foreground font-light">{product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}