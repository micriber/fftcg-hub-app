import {Card} from '../../services/api/card';

export type HomeStackParamList = {
  CollectionSearch: undefined;
  Home: undefined;
  CardDetails: {card: Card; pageTitle: string};
};
