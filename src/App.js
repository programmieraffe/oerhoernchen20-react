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

// https://stackoverflow.com/a/39333751
// 2DO: hot swapping is not possible, change it to dynamic version
// needs json loader for webpack
// (does not work by now, because data-prop of multi-list is not updated when values change)
import simpleOerTags from './data/simple_oer_tags.json';


class App extends Component {

    /* try to load metadata_fields.json before, did not work */
    // https://stackoverflow.com/questions/30929679/react-fetch-data-in-server-before-render
    // https://github.com/appbaseio/reactivesearch/issues/373

    constructor(props) {
        super(props);

        /*this.state = {
            simpleTagFields: null
        };*/

        // This binding is necessary to make `this` work in the callback
        //this.activateLasers = this.activateLasers.bind(this);
    }

    componentWillMount() {
        // does not work right now
        //this.renderMyData();
    }

    /*activateLasers(){
        this.setState({
          educationalSectorsData:[]
        });
    }*/

    renderMyData() {

        // does not work right now :(

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


    render() {
        return (

            <ReactiveBase app = "oerhoernchen20"
            credentials = "uPW3Wdmjv:356ded3b-f6ee-4b62-b189-67a0eae0c1f6" >

            {/* <button onClick={this.activateLasers}>
              Activate Lasers
            </button> */}

            {/*<div>{JSON.stringify(this.state.educationalSectorsData)}</div>*/}

            <div className = "row reverse-labels" >
            <div className = "col" >
            {/* We use DataList for translations */}

            {/* 2DO: show count does not work right now, wrong data field?*/}
            <MultiDataList 
            componentId="licenseTypeFilter"
            dataField = "license_type"
            className = "license-types-filter"
            defaultValue={["CC0","CC BY","CC BY-SA"]}
            title = "Lizenz"
            data={simpleOerTags.license_types}
            showSearch = {
                false
            }
            URLParams = {
                true
            }
            />

            <MultiDataList 
            componentId="educationalSectorsFilter"
            dataField = "educational_sectors"
            className = "educational-sectors-filter"
            title = "Bildungsbereich"
            data={simpleOerTags.educational_sectors}
            showSearch = {
                false
            }
            showCount = {
                true
            }
            URLParams = {
                true
            }
            /*size = {
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
            placeholder = "Search for a language"*/
            /*react = {
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
            }*/
            // 2DO: this does not update
            //data={this.state.educationalSectorsData}
            />

            <MultiDataList 
            componentId="technicalFormatsFilter"
            dataField = "technical_formats"
            className = "technical-formats-filter"
            title = "Technische Formate"
            data={simpleOerTags.technical_formats}
            showSearch = {
                false
            }
            URLParams = {
                true
            }
            />

            <MultiDataList 
            componentId="schoolSubjectsFilter"
            dataField = "schoolSubjectsFilter"
            className = "school-subjects-filter"
            title = "Schulfächer"
            data={simpleOerTags.school_subjects}
            showSearch = {
                true
            }
            URLParams = {
                true
            }
            size={3}
            />

            </div>
            <div className = "col"
            style = {
                {
                    backgroundColor: '#fafafa'
                }
            } >

            <SelectedFilters />
            <ReactiveList 
            componentId="SearchResults"
            dataField = "title"
            className = "search-results-container"
            pagination 
            URLParams
            // add all filters here - IMPORTANT!
            react={{
                "and": ["educationalSectorsFilter","licenseTypeFilter"]
            }}
            render = {
                ({
                    data
                }) => ( <ReactiveList.ResultListWrapper> {
                        data.map(item => ( <
                            ResultList key = {
                                item._id
                            } >
                            <ResultList.Image src = {item.thumbnail_url}/>
                            <ResultList.Content>
                            <ResultList.Title>
                            <div className = "title"
                            dangerouslySetInnerHTML = {
                                {
                                    __html: item.title,
                                }
                            }
                            /> 
                            </ResultList.Title> 

                            <ResultList.Description>

                            <div className = "flex column justify-space-between">
                            Lizenz: {item.license_type}<br/>
                            Bildungsbereich: {item.educational_sectors && item.educational_sectors.join(",")}<br/>
                            {item.description} <br/>
                            Lizenz-Attribution: {item.license_attribution} <br/>
                            Spezial-Thema: {item.special_topics && item.special_topics.join(",")}<br/>
                            Schule: {item.school_subjects && item.school_subjects.join(",")}<br/>
                            Hochschule: {item.higher_education_subjects && item.higher_education_subjects.join(",")}<br/>
                            </div>

                             </ResultList.Description>
                             
                             </ResultList.Content>
                             
                        </ResultList>
                        ))
                    } </ReactiveList.ResultListWrapper>
                )
            }
            /> </div> </div> </ReactiveBase>
        );
    }
}

export default App;