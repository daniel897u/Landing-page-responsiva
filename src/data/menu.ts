import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'entrada-1',
    name: 'Bolinhos de Vó',
    description: 'Bolinhas crocantes de bacalhau artesanal com batata, fritas em imersão e servidas com creme de alho assado e ervas.',
    price: 34.00,
    category: 'entradas',
    tags: ['Favorito', 'Tradição'],
    allergens: ['Glúten', 'Peixe']
  },
  {
    id: 'entrada-2',
    name: 'Tábua de Pão e Oliva',
    description: 'Pão de fermentação natural assado na hora, servido morno com azeite de oliva extra virgem temperado e tapenade de azeitonas verdes colhidas à mão.',
    price: 28.00,
    category: 'entradas',
    tags: ['Artesanal', 'Orgânico'],
    allergens: ['Glúten']
  },
  {
    id: 'entrada-3',
    name: 'Caldo da Horta',
    description: 'Caldo aveludado de batatas e couve picada fininha, perfumado com azeite de oliva e finalizado com uma fatia grelhada de paio artesanal.',
    price: 32.00,
    category: 'entradas',
    tags: ['Aquecedor', 'História'],
    allergens: ['Laticínios']
  },
  {
    id: 'principal-1',
    name: 'Cozido da Terra',
    description: 'Gisado denso de carne bovina premium cozida lentamente por 8 horas com mandioca, cenoura, batata doce e abóbora cabotiá vermelha, em panela de barro.',
    price: 78.00,
    category: 'principais',
    tags: ['Cozimento Lento', 'Destaque'],
    allergens: ['Glúten-Free'],
    imageUrl: '/src/assets/images/traditional_stew_1781719381334.jpg'
  },
  {
    id: 'principal-2',
    name: 'Bacalhau ao Azeite e Alho',
    description: 'Lombo de bacalhau em lascas suculentas, assado com dentes inteiros de alho confitado, batatinhas ao murro recheadas e cebolas caramelizadas em azeite de oliva suave.',
    price: 94.00,
    category: 'principais',
    tags: ['Legado de Família'],
    allergens: ['Peixe']
  },
  {
    id: 'principal-3',
    name: 'Arroz de Costela Perfumado',
    description: 'Arroz caldoso cozido no caldo de costela de boi desfiada na lenha, salpicado com raspas de laranja queimada fresca, agrião baby e gergelim tostado.',
    price: 84.00,
    category: 'principais',
    tags: ['Inédito', 'Sabor Forte'],
    allergens: []
  },
  {
    id: 'principal-4',
    name: 'Abóbora e Queijo de Altar',
    description: 'Metade de abóbora cabotiá assada na brasa, recheada com coalhada fresca artesanal, legumes da estação grelhados, nozes pecã e fio de mel de flores silvestres.',
    price: 68.00,
    category: 'principais',
    tags: ['Vegetariano', 'Leve'],
    allergens: ['Nozes', 'Laticínios']
  },
  {
    id: 'acompanhamento-1',
    name: 'Farofa de Milho Orgânico',
    description: 'Farinha de milho amarela grossa puxada na manteiga de garrafa com cebola roxa bem torradinha, sementes de girassol e cheiro-verde fresco.',
    price: 18.00,
    category: 'acompanhamentos',
    tags: ['Artesanal'],
    allergens: ['Laticínios']
  },
  {
    id: 'acompanhamento-2',
    name: 'Legumes na Cinza',
    description: 'Cenouras jovens, beterrabas e cebolas assadas diretamente sob o carvão e depois regadas com azeite de oliva de ervas e sal marinho grosso.',
    price: 22.00,
    category: 'acompanhamentos',
    tags: ['Vegetariano', 'Defumado'],
    allergens: []
  },
  {
    id: 'sobremesa-1',
    name: 'Doce de Leite e Queijo Meia Cura',
    description: 'Doce de leite cozido na panela de cobre até atingir consistência densa e escura, servido com lascas generosas de queijo de fazenda curado por 30 dias.',
    price: 24.00,
    category: 'sobremesas',
    tags: ['Clássico', 'Minas'],
    allergens: ['Laticínios']
  },
  {
    id: 'sobremesa-2',
    name: 'Rabanada de Laranja Grelhada',
    description: 'Rabanada perfumada com canela em pau e fava de baunilha, grelhada com açúcar demerara e regada com calda artesanal de laranja queimada e cardamomo.',
    price: 26.00,
    category: 'sobremesas',
    tags: ['Memorável'],
    allergens: ['Glúten', 'Laticínios']
  }
];
