/* https://medium.appbase.io/how-to-build-a-movie-search-app-with-react-and-elasticsearch-2470f202291c */
/* app="oerhoernchen20"
          credentials="uPW3Wdmjv:356ded3b-f6ee-4b62-b189-67a0eae0c1f6"*/

/* https://codesandbox.io/s/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ResultList?from-embed*/
/* Command Palette: From the command palette (ctrl/cmd + shift + p), type JsPrettier Format Code.*/
import React, {
    Component
} from 'react';
import {
    ReactiveBase,
    DataSearch,
    MultiList,
    RangeSlider,
    MultiDataList,
    SingleRange,
    SelectedFilters,
    ResultCard,
    ResultList,
    ReactiveList,
    SingleDropdownRange
} from '@appbaseio/reactivesearch';
import './App.css';


class App extends Component {

    /* try to load metadata_fields.json before, did not work */
    // https://stackoverflow.com/questions/30929679/react-fetch-data-in-server-before-render
    // https://github.com/appbaseio/reactivesearch/issues/373

    constructor(props) {
        super(props);

        this.state = {
            simpleTagFields: null
        };
    }

    componentWillMount() {
        this.renderMyData();
    }

    renderMyData() {

        // does not work right now :(

        // current workaround
        this.setState({
          educationalSectorsData:[{
                    "label": "Frühkindliche Erziehung",
                    "value": "earlychildhood"
                }, {
                    "label": "Grundschulbildung",
                    "value": "primaryschool"
                }, {
                    "label": "Sekundarstufe 1",
                    "value": "secondaryschool1"
                }, {
                    "label": "Sekundarstufe 2",
                    "value": "secondaryschool2"
                }, {
                    "label": "Hochschule",
                    "value": "highereducation"
                }, {
                    "label": "Berufliche Bildung",
                    "value": "vocationaleducation"
                }, {
                    "label": "Weiterbildung",
                    "value": "furthereducation"
                }]
        });

        /*fetch('https://raw.githubusercontent.com/programmieraffe/oerhoernchen-simple-tag-fields/master/data.json')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('reponse', responseJson)

                // convert to reactive-search format
                // ES6 - https://stackoverflow.com/questions/14379274/how-to-iterate-over-a-javascript-object
                var educationalSectorsData = [];
                for (let [key, translation] of Object.entries(responseJson.educational_sectors)) {
                    console.log(key, translation);
                    educationalSectorsData.push({'label':translation,'value':key});
                }   

                this.setState({
                    educationalSectorsData: educationalSectorsData
                });
            })
            .catch((error) => {
                console.error(error);
            });*/


    }

    // EO of try to load metadata fields


    render() {
        return (

            <ReactiveBase app = "oerhoernchen20"
            credentials = "uPW3Wdmjv:356ded3b-f6ee-4b62-b189-67a0eae0c1f6" >

        <div>{JSON.stringify(this.state.educationalSectorsData)}</div>

            <div className = "row reverse-labels" >
            <div className = "col" >
            <SingleDropdownRange componentId = "BookSensor"
            dataField = "average_rating"
            title = "SingleDropdownRange"
            data = {
                [{
                    start: 0,
                    end: 3,
                    label: 'Rating < 3'
                }, {
                    start: 3,
                    end: 4,
                    label: 'Rating 3 to 4'
                }, {
                    start: 4,
                    end: 5,
                    label: 'Rating > 4'
                }, ]
            }
            />

            <MultiDataList componentId = "language-list"
            dataField = "original_language.raw"
            className = "language-filter"
            title = "language"
            size = {
                100
            }
            sortBy = "asc"
            queryFormat = "or"
            selectAllLabel = "All Languages"
            showCheckbox = {
                true
            }
            showSearch = {
                true
            }
            placeholder = "Search for a language"
            react = {
                {
                    and: [
                        "mainSearch",
                        "results",
                        "date-filter",
                        "RangeSlider",
                        "genres-list",
                        "revenue-list"
                    ]
                }
            }
            data={this.state.educationalSectorsData}
            /*data={[
    {
      label: "English",
      value: "English"
    },
    {
      label: "Chinese",
      value: "Chinese"
    },
    {
      label: "Hindi",
      value: "Hindi"
    }
  ]}*/
            showFilter = {
                true
            }
            filterLabel = "Language"
            URLParams = {
                false
            }
            innerClass = {
                {
                    label: "list-item",
                    input: "list-input"
                }
            }
            />

            </div> <div className = "col"
            style = {
                {
                    backgroundColor: '#fafafa'
                }
            } >
<ReactiveList componentId = "SearchResult"
            dataField = "title"
            size = {
                3
            }
            className = "result-list-container"
            pagination URLParams react = {
                {
                    and: 'BookSensor',
                }
            }
            render = {
                ({
                    data
                }) => ( <ReactiveList.ResultListWrapper> {
                        data.map(item => ( <
                            ResultList key = {
                                item._id
                            } >
                            <ResultList.Image src = {item.thumbnail_url}/> <ResultList.Content>
                            <ResultList.Title>
                            <div className = "book-title"
                            dangerouslySetInnerHTML = {
                                {
                                    __html: item.title,
                                }
                            }
                            /> </ResultList.Title> <ResultList.Description>
                            <div className = "flex column justify-space-between">
                            <div>
                            <div>
                            by {
                                ' '
                            } <span className = "authors-list">Bildungsbereich: {item.educational_sectors && item.educational_sectors.join(",")} </span> </div> <div className = "ratings-list flex align-center">
                            <span className = "stars"> {
                                Array(item.average_rating_rounded)
                                .fill('x')
                                .map((
                                    item, // eslint-disable-line
                                    index,
                                ) => ( <
                                    i className = "fas fa-star"
                                    key = {
                                        index
                                    } // eslint-disable-line
                                    />
                                ))
                            } </span> <span className = "avg-rating" >
                            ({
                                    item.average_rating
                                }
                                avg) </span> </div> </div> <span className = "pub-year" >
                            Pub {
                                item.original_publication_year
                            } </span> </div> </ResultList.Description> </ResultList.Content > </ResultList>
                        ))
                    } </ReactiveList.ResultListWrapper>
                )
            }
            /> </div> </div> </ReactiveBase>
        );
    }
}

export default App;