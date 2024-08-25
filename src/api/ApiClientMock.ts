import {
  MenuItem,
  Outlet,
  OutletDetail,
  PromoItem,
  ResponseData,
  SearchItem,
} from '@/types';

class ApiClientMock {
  // Simulate fetching promo items
  async fetchPromoItems(): Promise<ResponseData<PromoItem[]>> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: promoItems, // Assuming promoItems is defined elsewhere in your code
          statusCode: 200,
        });
      }, 1000); // Simulate a 1 second network delay
    });
  }

  async fetchOutlets(): Promise<ResponseData<Outlet[]>> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: outlets, // Assuming outlets is defined elsewhere in your code
          statusCode: 200,
        });
      }, 1000); // Simulate a 1 second network delay
    });
  }

  async fetchOutletDetails(
    outletId: string,
  ): Promise<ResponseData<OutletDetail>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const outlet = outlets.find(o => o.id === outletId);
        const menuItemsForOutlet = menuItems.filter(
          item => item.outletId === outletId,
        );

        if (outlet) {
          resolve({
            data: {
              id: outlet.id,
              outlet: outlet,
              menuItems: menuItemsForOutlet,
            },
            statusCode: 200,
          });
        } else {
          resolve({
            statusCode: 404,
            error: 'Outlet not found',
          });
        }
      }, 1000); // Simulate a 1-second network delay
    });
  }

  // Simulate fetching menu items
  async fetchMenuItems(outletId: string): Promise<MenuItem[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(menuItems.filter(item => item.outletId === outletId));
      }, 1000); // Simulate a 1 second network delay
    });
  }

  async search(query: string): Promise<ResponseData<SearchItem[]>> {
    return new Promise(resolve => {
      setTimeout(() => {
        const lowercasedQuery = query.toLowerCase();

        const matchedOutlets: SearchItem[] = outlets
          .filter(outlet => outlet.name.toLowerCase().includes(lowercasedQuery))
          .map(outlet => ({id: outlet.id, outlet: outlet}));

        const matchedMenuItems: SearchItem[] = menuItems.filter(menuItem =>
          menuItem.name.toLowerCase().includes(lowercasedQuery),
        ).map(menuItem => ({id: menuItem.id, menuItem: menuItem}));;

        resolve({
          data: [...matchedOutlets, ...matchedMenuItems],
          statusCode: 200,
        });
      }, 1000); // Simulate a 1-second network delay
    });
  }
}

// Example data generation
const outlets: Outlet[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    description: 'Delicious pizzas with fresh ingredients.',
    image: require('../assets/images/pizza.jpg'),
  },
  {
    id: '2',
    name: 'Burger Haven',
    description: 'Juicy burgers with a variety of toppings.',
    image: require('../assets/images/burger.jpg'),
  },
  {
    id: '3',
    name: 'Sushi World',
    description: 'Fresh sushi and Japanese cuisine.',
    image: require('../assets/images/sushi.jpg'),
  },
  {
    id: '4',
    name: 'Pasta Paradise',
    description: 'Hearty pasta dishes and Italian favorites.',
    image: require('../assets/images/pasta.jpg'),
  },
  {
    id: '5',
    name: 'Taco Town',
    description: 'Tasty tacos and Mexican delights.',
    image: require('../assets/images/tico.jpg'),
  },
];

const menuItems: MenuItem[] = [
  // Pizza Palace Menu Items
  {
    id: '10',
    outletId: '1',
    name: 'Margherita Pizza',
    price: 8.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '102',
    outletId: '1',
    name: 'Pepperoni Pizza',
    price: 9.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '103',
    outletId: '1',
    name: 'BBQ Chicken Pizza',
    price: 10.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '104',
    outletId: '1',
    name: 'Hawaiian Pizza',
    price: 11.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '105',
    outletId: '1',
    name: 'Veggie Pizza',
    price: 8.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },

  // Burger Haven Menu Items
  {
    id: '106',
    outletId: '2',
    name: 'Classic Burger',
    price: 7.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '107',
    outletId: '2',
    name: 'Cheeseburger',
    price: 8.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '108',
    outletId: '2',
    name: 'Bacon Burger',
    price: 9.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
{
    id: '109',
    outletId: '2',
    name: 'Mushroom Swiss Burger',
    price: 9.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '110',
    outletId: '2',
    name: 'Veggie Burger',
    price: 7.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },

  // Sushi World Menu Items
  {
    id: '111',
    outletId: '3',
    name: 'California Roll',
    price: 6.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '112',
    outletId: '3',
    name: 'Spicy Tuna Roll',
    price: 7.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '113',
    outletId: '3',
    name: 'Dragon Roll',
    price: 8.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '114',
    outletId: '3',
    name: 'Salmon Nigiri',
    price: 5.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '115',
    outletId: '3',
    name: 'Ebi Nigiri',
    price: 5.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '116',
    outletId: '3',
    name: 'Tempura Roll',
    price: 7.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },

  // Pasta Paradise Menu Items
  {
    id: '117',
    outletId: '4',
    name: 'Spaghetti Bolognese',
    price: 11.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '118',
    outletId: '4',
    name: 'Fettuccine Alfredo',
    price: 12.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '119',
    outletId: '4',
    name: 'Penne Arrabbiata',
    price: 10.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '120',
    outletId: '4',
    name: 'Lasagna',
    price: 13.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '121',
    outletId: '4',
    name: 'Carbonara',
    price: 12.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },

  // Taco Town Menu Items
  {
    id: '122',
    outletId: '5',
    name: 'Beef Taco',
    price: 3.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '123',
    outletId: '5',
    name: 'Chicken Taco',
    price: 4.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '124',
    outletId: '5',
    name: 'Fish Taco',
    price: 4.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '125',
    outletId: '5',
    name: 'Veggie Taco',
    price: 3.99,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
  {
    id: '126',
    outletId: '5',
    name: 'Carnitas Taco',
    price: 4.49,
    image: require('../assets/images/sushi.jpg'),
    description: 'This is test menu description',
  },
];

const promoItems: PromoItem[] = [
  {id: '1', name: 'Pizza Promo', image: 'pizza.jpg'},
  {id: '2', name: 'Burger Promo', image: 'burger.jpg'},
];
export default ApiClientMock;
