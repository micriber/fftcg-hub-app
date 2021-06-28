import {Card} from '../../services/api/card';

export type SearchStackParamList = {
  GlobalSearch: undefined;
  CardDetails: {card: Card};
} & CardStackParamList;

export type CardStackParamList = {
  CardDetails: {card: Card; pageTitle: string};
};
