// express desing pattern

// 테스트용 데이터 = mocking

// cat entity
export type CatType = {
  id: string; // 고유 식별자
  name: string;
  age: number;
  species: string; // 종류
  isCute: boolean;
  friends: string[]; // 다른 개체와 연결을 할 때 id로 join
};

export const Cat: CatType[] = [
  {
    id: 'fsduifh',
    name: 'blue',
    age: 8,
    species: 'Russian Blue',
    isCute: true,
    friends: ['asdfhj29009', 'WE09tju2j'],
  },
  {
    id: 'iohf2309q4hr',
    name: 'som',
    age: 4,
    species: 'Sphynx cat',
    isCute: true,
    friends: ['weju0fj20qj', 'asdfhj29009', 'weju0fj20qj'],
  },
  {
    id: 'WE09tju2j',
    name: 'lean',
    age: 6,
    species: 'Munchkin',
    isCute: false,
    friends: [],
  },
  {
    id: 'asdfhj29009',
    name: 'star',
    age: 10,
    species: 'Scottish Fold',
    isCute: true,
    friends: ['weju0fj20qj'],
  },
  {
    id: 'weju0fj20qj',
    name: 'red',
    age: 2,
    species: 'Sharm',
    isCute: false,
    friends: [],
  },
];
