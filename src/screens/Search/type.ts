import {Card} from '../../services/api/card';
import {CardStackParamList} from '../Cards/type';

export type SearchStackParamList = {
  GlobalSearch: undefined;
  CardDetails: {card: Card};
} & CardStackParamList;
