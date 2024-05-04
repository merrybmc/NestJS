import * as express from 'express';
import catsRouter from './cats/cats.route';

// singleton pattern
// 객체의 인스턴스가 오직 1개만 생성되게 하는 패턴
// 클래스로 인스턴스를 1개만 생성하는 패턴
// 최초 한 번의 new 연산자를 통해 객체를 만들고 추후 객체에 접근을 할 때 메모리 낭비를 방지
// 다른 클래스간의 데이터 공유가 쉬움

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    // route 분리
    this.app.use('/cats', catsRouter);
  }

  private setMiddleWare() {
    // json middleWare
    this.app.use(express.json());

    this.setRoute();

    // logging middleware
    // 코드 순서에 영향을 받음
    this.app.use((req, res, next: express.NextFunction) => {
      console.log('this is middleware');
      next();
    });
  }

  public listen() {
    const port = 8000;

    this.app.listen(port, () => {
      console.log('server connect');
    });
  }
}

const server = new Server();
server.listen();

server.app.get('/', (req, res) => {
  res.send('hello world');
});
