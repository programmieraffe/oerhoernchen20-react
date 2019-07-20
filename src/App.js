/* https://medium.appbase.io/how-to-build-a-movie-search-app-with-react-and-elasticsearch-2470f202291c */
/* app="oerhoernchen20"
          credentials="uPW3Wdmjv:356ded3b-f6ee-4b62-b189-67a0eae0c1f6"*/

/* https://codesandbox.io/s/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ResultList?from-embed*/

import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard,
  ResultList,
  ReactiveList,
  SingleDropdownRange
} from '@appbaseio/reactivesearch';
import './App.css';


class App extends Component {
  render() {
    return (
  <ReactiveBase app="oerhoernchen20"
          credentials="uPW3Wdmjv:356ded3b-f6ee-4b62-b189-67a0eae0c1f6">
    <div className="row reverse-labels">
      <div className="col">
        <SingleDropdownRange
          componentId="BookSensor"
          dataField="average_rating"
          title="SingleDropdownRange"
          data={[
            { start: 0, end: 3, label: 'Rating < 3' },
            { start: 3, end: 4, label: 'Rating 3 to 4' },
            { start: 4, end: 5, label: 'Rating > 4' },
          ]}
        />
      </div>
      <div className="col" style={{ backgroundColor: '#fafafa' }}>
        <ReactiveList
          componentId="SearchResult"
          dataField="original_title"
          size={3}
          className="result-list-container"
          pagination
          URLParams
          react={{
            and: 'BookSensor',
          }}
          render={({ data }) => (
            <ReactiveList.ResultListWrapper>
              {data.map(item => (
                <ResultList key={item._id}>
                  <ResultList.Image src={item.image} />
                  <ResultList.Content>
                    <ResultList.Title>
                      <div
                        className="book-title"
                        dangerouslySetInnerHTML={{
                          __html: item.original_title,
                        }}
                      />
                    </ResultList.Title>
                    <ResultList.Description>
                      <div className="flex column justify-space-between">
                        <div>
                          <div>
                            by{' '}
                            <span className="authors-list">
                              {item.authors}
                            </span>
                          </div>
                          <div className="ratings-list flex align-center">
                            <span className="stars">
                              {Array(item.average_rating_rounded)
                                .fill('x')
                                .map((
                                  item, // eslint-disable-line
                                  index,
                                ) => (
                                  <i
                                    className="fas fa-star"
                                    key={index} // eslint-disable-line
                                  />
                                ))}
                            </span>
                            <span className="avg-rating">
                              ({item.average_rating} avg)
                            </span>
                          </div>
                        </div>
                        <span className="pub-year">
                          Pub {item.original_publication_year}
                        </span>
                      </div>
                    </ResultList.Description>
                  </ResultList.Content>
                </ResultList>
              ))}
            </ReactiveList.ResultListWrapper>
          )}
        />
      </div>
    </div>
  </ReactiveBase>
);
  }
}

export default App;