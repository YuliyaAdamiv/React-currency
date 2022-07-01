import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';

import {GlobalStyle, AppWrapper, Error, CurrencyInfo, Loading} from './styles';

import {
  getRate,
  fromChangeInput,
  toChangeInput,
  fromCurrencyChange,
  toCurrencyChange,
  handleSwitch,
} from '../store/actions/currencyActions';

import currencyExchangeList from '../consts/CurrencyCodes';
import {displayCurrency} from '../utils/currencyUtils';

function Header({error, isFetched, convertFrom, convertTo, getRate}) {
  useEffect(() => {
    getRate(convertFrom, convertTo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currencyList = Object.values(currencyExchangeList);
  return (
    <Fragment>
      <GlobalStyle />
      {error && <Error>{error.message}</Error>}
      {!isFetched && !error && <Loading>Loading...</Loading>}
      {isFetched && (
        <AppWrapper>
          <CurrencyInfo>
            <p>
              {displayCurrency({
                currencyList,
                currencyId: 'USD',
                number: 1,
              })}{' '}
              equals{' '}
            </p>
            <h4>
              {displayCurrency({
                currencyList,
                currencyId: 'UAH',
                number: 29.54,
              })}
            </h4>
          </CurrencyInfo>
          <CurrencyInfo>
            <p>
              {displayCurrency({
                currencyList,
                currencyId: 'EUR',
                number: 1,
              })}{' '}
              equals{' '}
            </p>
            <h4>
              {displayCurrency({
                currencyList,
                currencyId: 'UAH',
                number: 30.841,
              })}
            </h4>
          </CurrencyInfo>
        </AppWrapper>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({currency}) => ({
  currency: currency.data,
  error: currency.error,
  isFetched: currency.isFetched,
  from: currency.from,
  to: currency.to,
  convertFrom: currency.convertFrom,
  convertTo: currency.convertTo,
  toChangeInput: currency.toChangeInput,
  fromChangeInput: currency.fromChangeInput,
  fromCurrencyChange: currency.fromCurrencyChange,
  toCurrencyChange: currency.toCurrencyChange,
  handleSwitch: currency.handleSwitch,
  getRate: currency.getRate,
});

const mapDispatchToProps = (dispatch) => ({
  getRate: (fromCurrency, toCurrency) => {
    dispatch(getRate(fromCurrency, toCurrency));
  },
  toChangeInput: (value) => {
    dispatch(toChangeInput(value));
  },
  fromChangeInput: (value) => {
    dispatch(fromChangeInput(value));
  },
  fromCurrencyChange: (payload) => {
    dispatch(fromCurrencyChange(payload));
  },
  toCurrencyChange: (payload) => {
    dispatch(toCurrencyChange(payload));
  },
  handleSwitch: (payload) => {
    dispatch(handleSwitch(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
