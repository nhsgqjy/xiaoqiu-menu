export type Category =
  | 'beef'
  | 'chicken'
  | 'seafood'
  | 'pork'
  | 'vegetable'
  | 'egg'
  | 'soup'
  | 'cold-dish'
  | 'staple';

export interface Dish {
  id: number;
  name: string;
  category: Category;
  emoji: string;
  imageQuery: string;
  image: string;
  notes?: string;
  tags?: string[];
}

export interface CategoryInfo {
  key: Category;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  { key: 'beef', label: '牛肉类', emoji: '🥩', color: '#ef4444', description: '牛肉、牛腩、牛腱' },
  { key: 'chicken', label: '鸡肉类', emoji: '🍗', color: '#f59e0b', description: '鸡肉、鸡翅、鸡蛋…呃鸡蛋有专门分类' },
  { key: 'seafood', label: '海鲜类', emoji: '🦐', color: '#06b6d4', description: '鱼、虾、蛤蜊、鱿鱼' },
  { key: 'pork', label: '猪肉类', emoji: '🥓', color: '#f97316', description: '猪肉、排骨、腊肠' },
  { key: 'vegetable', label: '蔬菜类', emoji: '🥬', color: '#22c55e', description: '各类蔬菜、菌菇' },
  { key: 'egg', label: '蛋类', emoji: '🥚', color: '#eab308', description: '鸡蛋为主角的菜' },
  { key: 'soup', label: '汤类', emoji: '🍲', color: '#6366f1', description: '汤羹' },
  { key: 'cold-dish', label: '凉拌', emoji: '🥗', color: '#14b8a6', description: '凉拌菜' },
  { key: 'staple', label: '主食', emoji: '🍚', color: '#a855f7', description: '饭、面、粉、煲' },
];

const dishes: Dish[] = [
  // ==================== 牛肉类 ====================
  {
    id: 1,
    name: '香菜牛肉',
    category: 'beef',
    emoji: '🥩',
    imageQuery: 'cilantro-beef-stir-fry',
    image: '',
  },
  {
    id: 31,
    name: '洋葱炒牛肉',
    category: 'beef',
    emoji: '🧅',
    imageQuery: 'onion-beef-stir-fry',
    image: '',
    notes: '洋葱炒出香味再下牛肉，牛肉要大火快炒。',
  },
  {
    id: 33,
    name: '番茄牛腩',
    category: 'beef',
    emoji: '🍅',
    imageQuery: 'tomato-beef-brisket-stew',
    image: '',
    notes: '牛腩要先焯水去血沫，番茄炒出沙再炖。',
    tags: ['待攻克'],
  },
  {
    id: 47,
    name: '鲜烫牛肉',
    category: 'beef',
    emoji: '🥓',
    imageQuery: 'hot-pot-sliced-beef',
    image: '',
    notes: '用雪花或者五花趾，切薄片，汤滚后烫几秒就行，老了就不好吃。',
  },

  // ==================== 鸡肉类 ====================
  {
    id: 2,
    name: '香菇滑鸡',
    category: 'chicken',
    emoji: '🍄',
    imageQuery: 'mushroom-chicken-stir-fry',
    image: '',
    notes: '香菇提前泡发，鸡肉用料酒和淀粉腌一下才嫩滑。',
  },
  {
    id: 24,
    name: '香菇马蹄蒸肉饼',
    category: 'chicken',
    emoji: '🥟',
    imageQuery: 'steamed-meat-patty',
    image: '',
    notes: '用新鲜五花肉剁碎，香菇和马蹄切粒，搅拌均匀后蒸。',
  },
  {
    id: 32,
    name: '葱姜鸡',
    category: 'chicken',
    emoji: '🧄',
    imageQuery: 'ginger-scallion-chicken',
    image: '',
    notes: '三种做法：葱姜鸡、盐焗手撕鸡、辣的手撕鸡，都用白切鸡做底。',
  },
  {
    id: 34,
    name: '可乐鸡翅',
    category: 'chicken',
    emoji: '🥤',
    imageQuery: 'cola-chicken-wings',
    image: '',
    notes: '盐焗鸡翅、香煎鸡翅、可乐鸡翅三种做法。',
    tags: ['放纵日'],
  },
  {
    id: 35,
    name: '蒜香鸡翅',
    category: 'chicken',
    emoji: '🧄',
    imageQuery: 'garlic-chicken-wings',
    image: '',
    notes: '蒜末要够多，腌制时间要够久才入味。',
  },

  // ==================== 海鲜类 ====================
  {
    id: 6,
    name: '虾仁滑蛋',
    category: 'seafood',
    emoji: '🍤',
    imageQuery: 'shrimp-egg-stir-fry',
    image: '',
    notes: '虾仁先滑炒盛出，蛋液入锅后用铲子推，蛋嫩虾弹。',
  },
  {
    id: 15,
    name: '蒜苔炒鱿鱼',
    category: 'seafood',
    emoji: '🦑',
    imageQuery: 'garlic-scape-squid',
    image: '',
    notes: '鱿鱼打花刀，大火快炒。',
  },
  {
    id: 22,
    name: '清蒸鲈鱼',
    category: 'seafood',
    emoji: '🐟',
    imageQuery: 'steamed-sea-bass',
    image: '',
    notes: '鱼身划几刀，铺上姜丝葱段，水开后蒸 8-10 分钟，最后淋热油和蒸鱼豉油。',
  },
  {
    id: 40,
    name: '炒蛤蜊',
    category: 'seafood',
    emoji: '🦪',
    imageQuery: 'stir-fried-clams',
    image: '',
    notes: '蛤蜊要吐沙干净，大火爆炒到开口就行。',
  },
  {
    id: 52,
    name: '海皇粉丝煲',
    category: 'seafood',
    emoji: '🍜',
    imageQuery: 'seafood-vermicelli-claypot',
    image: '',
    notes: '还没做过，失败过。关键在汤底和火候。',
    tags: ['待攻克'],
  },

  // ==================== 猪肉类 ====================
  {
    id: 7,
    name: '肉末茄子',
    category: 'pork',
    emoji: '🍆',
    imageQuery: 'eggplant-minced-pork',
    image: '',
    notes: '茄子要蒸软再下锅，肉末先炒香。',
  },
  {
    id: 8,
    name: '土豆片炒五花肉',
    category: 'pork',
    emoji: '🥔',
    imageQuery: 'potato-sliced-pork-belly',
    image: '',
    notes: '土豆片切完要洗一下；必须用新鲜五花肉，不然容易腥；土豆片要香，要先煎土豆片到微焦。',
  },
  {
    id: 14,
    name: '蒜苔炒肉沫',
    category: 'pork',
    emoji: '🥬',
    imageQuery: 'garlic-scape-minced-pork',
    image: '',
    notes: '蒜苔切丁，肉末炒散后加蒜苔，加点生抽和豆瓣酱。',
  },
  {
    id: 23,
    name: '荷兰豆炒腊肠',
    category: 'pork',
    emoji: '🫛',
    imageQuery: 'snow-pea-chinese-sausage',
    image: '',
    notes: '荷兰豆去筋，腊肠切片，先炒腊肠出油再下荷兰豆。',
  },
  {
    id: 29,
    name: '豉汁蒸排骨',
    category: 'pork',
    emoji: '🦴',
    imageQuery: 'black-bean-sauce-spare-ribs',
    image: '',
    notes: '要用肋排！豆豉剁碎和蒜蓉一起爆香，拌入排骨腌制后蒸。也可以做芋头排骨。',
  },
  {
    id: 30,
    name: '香煎排骨',
    category: 'pork',
    emoji: '🍖',
    imageQuery: 'pan-fried-spare-ribs',
    image: '',
    notes: '目前还未成功过。排骨要先煮/蒸熟再煎，还是直接生煎？继续实验中。',
    tags: ['待攻克'],
  },
  {
    id: 36,
    name: '辣椒炒肉',
    category: 'pork',
    emoji: '🌶️',
    imageQuery: 'chili-pepper-stir-fry-pork',
    image: '',
    notes: '湖南名菜，辣椒要炒出虎皮，肉要薄切。',
  },
  {
    id: 37,
    name: '农家一碗香',
    category: 'pork',
    emoji: '🥘',
    imageQuery: 'chinese-farmhouse-stir-fry',
    image: '',
    notes: '鸡蛋、五花肉、辣椒一起炒，下饭菜。',
  },
  {
    id: 41,
    name: '蒜泥白肉',
    category: 'pork',
    emoji: '🧄',
    imageQuery: 'garlic-white-pork-slices',
    image: '',
    notes: '五花肉煮熟切薄片，蒜泥汁是灵魂：蒜末、生抽、醋、辣椒油、花椒油。',
  },
  {
    id: 44,
    name: '茄汁煎猪扒',
    category: 'pork',
    emoji: '🍅',
    imageQuery: 'tomato-sauce-pork-chop',
    image: '',
    notes: '猪扒先用刀背拍松，裹薄淀粉再煎，最后淋茄汁。',
  },
  {
    id: 48,
    name: '菠萝咕噜肉',
    category: 'pork',
    emoji: '🍍',
    imageQuery: 'sweet-sour-pork-pineapple',
    image: '',
    notes: '要裹厚淀粉（玉米淀粉），肉还是有点腥，再试下新鲜肉或者加花雕酒去腥。',
    tags: ['待攻克'],
  },
  {
    id: 53,
    name: '番茄酸汤肥牛',
    category: 'pork',
    emoji: '🍅',
    imageQuery: 'tomato-sour-soup-fatty-beef',
    image: '',
    notes: '酸汤底用番茄和泡椒/酸菜，肥牛烫熟就行不要煮老。',
  },

  // ==================== 蔬菜类 ====================
  {
    id: 3,
    name: '上汤娃娃菜',
    category: 'vegetable',
    emoji: '🥬',
    imageQuery: 'supreme-broth-baby-cabbage',
    image: '',
    notes: '也可以用菜苗，高汤是灵魂（用皮蛋+咸鸭蛋+火腿粒也可以模拟）。',
  },
  {
    id: 4,
    name: '干煸杏鲍菇',
    category: 'vegetable',
    emoji: '🍄',
    imageQuery: 'dry-fried-king-oyster-mushroom',
    image: '',
    notes: '杏鲍菇手撕成条，干锅煸出水分后再加油炒。',
  },
  {
    id: 9,
    name: '酸辣土豆丝',
    category: 'vegetable',
    emoji: '🥔',
    imageQuery: 'sour-spicy-shredded-potato',
    image: '',
    notes: '土豆丝要切细，泡水去掉淀粉，大火快炒保脆。醋要分两次加。',
  },
  {
    id: 10,
    name: '西葫芦炒肉',
    category: 'vegetable',
    emoji: '🥒',
    imageQuery: 'zucchini-stir-fry-pork',
    image: '',
  },
  {
    id: 11,
    name: '平菇炒肉',
    category: 'vegetable',
    emoji: '🍄',
    imageQuery: 'oyster-mushroom-stir-fry',
    image: '',
    notes: '用珍味菇。',
  },
  {
    id: 12,
    name: '花菜炒肉',
    category: 'vegetable',
    emoji: '🥦',
    imageQuery: 'cauliflower-stir-fry',
    image: '',
    notes: '花菜要煸，煸到表面微焦才香。',
  },
  {
    id: 13,
    name: '黄瓜炒肉',
    category: 'vegetable',
    emoji: '🥒',
    imageQuery: 'cucumber-stir-fry-pork',
    image: '',
  },
  {
    id: 16,
    name: '炒平菇',
    category: 'vegetable',
    emoji: '🍄',
    imageQuery: 'stir-fried-oyster-mushroom',
    image: '',
  },
  {
    id: 17,
    name: '蒜蓉青菜',
    category: 'vegetable',
    emoji: '🥬',
    imageQuery: 'garlic-stir-fried-green-vegetable',
    image: '',
    notes: '适用菜心、空心菜、娃娃菜、菠菜、生菜、鸡毛菜、上海青、番薯叶。蒜蓉爆香后下菜大火快炒。',
  },
  {
    id: 18,
    name: '蒜蓉金针菇',
    category: 'vegetable',
    emoji: '🍄',
    imageQuery: 'garlic-enoki-mushroom',
    image: '',
    notes: '金针菇铺盘，浇上炒香的蒜蓉酱，蒸 5-8 分钟。',
  },
  {
    id: 19,
    name: '蒜蓉粉丝娃娃菜',
    category: 'vegetable',
    emoji: '🥬',
    imageQuery: 'garlic-vermicelli-baby-cabbage',
    image: '',
    notes: '粉丝铺底，娃娃菜对半切摆在上面，浇蒜蓉酱蒸。',
  },
  {
    id: 20,
    name: '蒜蓉烤茄子',
    category: 'vegetable',
    emoji: '🍆',
    imageQuery: 'garlic-grilled-eggplant',
    image: '',
    notes: '茄子整个烤软后划开，铺上蒜蓉酱再烤一会。',
  },
  {
    id: 39,
    name: '凉拌茄子 / 擂椒皮蛋',
    category: 'vegetable',
    emoji: '🍆',
    imageQuery: 'mashed-eggplant-century-egg',
    image: '',
    notes: '茄子蒸熟撕条凉拌，或和皮蛋一起擂。',
  },
  {
    id: 43,
    name: '酸辣娃娃菜',
    category: 'vegetable',
    emoji: '🌶️',
    imageQuery: 'sour-spicy-baby-cabbage',
    image: '',
    notes: '干辣椒和花椒爆锅，醋最后放。',
  },
  {
    id: 46,
    name: '蒜蓉蚝油生菜',
    category: 'vegetable',
    emoji: '🥬',
    imageQuery: 'lettuce-oyster-sauce',
    image: '',
    notes: '生菜焯水几秒就捞出，淋上蒜蓉蚝油汁。不要焯太久会软烂。',
  },
  {
    id: 49,
    name: '手撕包菜',
    category: 'vegetable',
    emoji: '🥬',
    imageQuery: 'hand-torn-cabbage-stir-fry',
    image: '',
    notes: '包菜一定要手撕，干辣椒和花椒爆锅，大火快炒保脆。',
  },

  // ==================== 蛋类 ====================
  {
    id: 5,
    name: '番茄炒蛋',
    category: 'egg',
    emoji: '🍳',
    imageQuery: 'tomato-scrambled-eggs',
    image: '',
    notes: '三种变体：番茄鸡蛋、韭黄炒蛋、葱花炒蛋。核心都是先把蛋炒成型盛出。',
  },
  {
    id: 38,
    name: '黄金蛋炒饭',
    category: 'egg',
    emoji: '🍛',
    imageQuery: 'golden-egg-fried-rice',
    image: '',
    notes: '隋坡版：蛋液先裹在米饭上再炒，米粒粒粒金黄。',
  },
  {
    id: 45,
    name: '鸡蛋饼',
    category: 'egg',
    emoji: '🫓',
    imageQuery: 'chinese-egg-pancake',
    image: '',
    notes: '面糊调稀一点，摊薄才好吃。可以加葱花、火腿粒。',
  },

  // ==================== 汤类 ====================
  {
    id: 21,
    name: '枸杞叶瘦肉汤',
    category: 'soup',
    emoji: '🥣',
    imageQuery: 'goji-leaf-pork-soup',
    image: '',
    notes: '枸杞叶最后放，烫熟就行，不要久煮。',
  },
  {
    id: 25,
    name: '冬瓜肉丸汤',
    category: 'soup',
    emoji: '🍈',
    imageQuery: 'winter-melon-meatball-soup',
    image: '',
    notes: '肉丸自己剁才弹，冬瓜煮到透明就好。',
  },
  {
    id: 26,
    name: '菠菜汤',
    category: 'soup',
    emoji: '🥬',
    imageQuery: 'spinach-soup',
    image: '',
  },
  {
    id: 27,
    name: '玉米萝卜排骨汤',
    category: 'soup',
    emoji: '🌽',
    imageQuery: 'corn-carrot-pork-rib-soup',
    image: '',
    notes: '用的扇骨，汤更清甜。',
  },

  // ==================== 凉拌类 ====================
  {
    id: 28,
    name: '凉拌海带苗',
    category: 'cold-dish',
    emoji: '🥗',
    imageQuery: 'seaweed-salad',
    image: '',
    notes: '海带苗焯水后过凉，加蒜末、醋、生抽、辣椒油拌匀。',
  },

  // ==================== 主食类 ====================
  {
    id: 42,
    name: '腊味煲仔饭',
    category: 'staple',
    emoji: '🍚',
    imageQuery: 'claypot-rice-chinese-sausage',
    image: '',
    notes: '食材多了，下次注意不要放太多料。米要煮熟一点。',
  },
  {
    id: 50,
    name: '百香果酸汤米线',
    category: 'staple',
    emoji: '🍜',
    imageQuery: 'passion-fruit-sour-soup-rice-noodle',
    image: '',
    notes: '🐮 牛专属，邱不会做。用百香果做酸汤底，配米线。',
    tags: ['牛专属'],
  },
  {
    id: 51,
    name: '鸡蛋清汤面',
    category: 'staple',
    emoji: '🍜',
    imageQuery: 'egg-clear-soup-noodles',
    image: '',
    notes: '巨简单巨好吃：清汤底（酱油+香油+葱花），煮面最后打个蛋，汤清味鲜。',
  },
];

// Generate Unsplash image URLs for each dish
export function getDishImage(dish: Dish): string {
  return `https://source.unsplash.com/400x300/?${dish.imageQuery},food,chinese-cuisine`;
}

// Re-export dishes with images populated
export const dishesData: Dish[] = dishes.map(d => ({
  ...d,
  image: getDishImage(d),
}));

export function getDishesByCategory(category: Category): Dish[] {
  return dishesData.filter(d => d.category === category);
}

export function getDishById(id: number): Dish | undefined {
  return dishesData.find(d => d.id === id);
}
