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
    SingleDropdownRange,
    DynamicRangeSlider,
    RangeInput,
    DateRange
} from '@appbaseio/reactivesearch';
import './App.css';

import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';

// https://stackoverflow.com/a/39333751
// 2DO: hot swapping is not possible, change it to dynamic version
// needs json loader for webpack
// (does not work by now, because data-prop of multi-list is not updated when values change)
import simpleOerTags from './data/simple_oer_tags.json';

import logo from './images/squirrel-2781394_640_annawadl_pixabay_cc0.jpg';


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

        {/* new react-bootstrap layout */}

        <Navbar bg="dark" id="navbar" expand="lg">
              <Navbar.Brand href="/">{/*<img src={logo} class="rounded-circle"/>*/}OERtags

                

              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/*<Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>*/}
              </Navbar.Collapse>
            </Navbar>

        <Container fluid={true}>
          <Row>

            <Col sm={4} lg={3}>
                 <div className="filters-container">
                    <DataSearch
                      componentId="searchFilter"
                      className="filter"
                      dataField={["title","description"]}
                      //title="Search"
                      //defaultValue="Songwriting"
                      fieldWeights={[1, 3]}
                      placeholder="Suche nach Begriff(en)"
                      autosuggest={true}
                      //defaultSuggestions={[{label: "Songwriting", value: "Songwriting"}, {label: "Musicians", value: "Musicians"}]}
                      highlight={true}
                      //highlightField="group_city"
                      queryFormat="or"
                      fuzziness={0}
                      debounce={100}
                      /*react={{
                        and: ["CategoryFilter", "SearchFilter"]
                      }}*/
                      showFilter={true}
                      filterLabel="Begriffsuche"
                      URLParams={false}
                    />

                    <MultiDataList 
                    componentId="speciaTopicsFilter"
                    dataField = "special_topics"
                    className = "filter"
                    title = "Spezial-Themen"
                    data={simpleOerTags.special_topics}
                    showSearch = {
                        false
                    }
                    URLParams = {
                        true
                    }
                    size={3}
                    />

                    <MultiDataList 
                    componentId="licenseTypeFilter"
                    dataField = "license_type"
                    className = "filter"
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
                    className = "filter"
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
                    } />

                    <MultiDataList 
                    componentId="schoolSubjectsFilter"
                    dataField = "school_subjects"
                    className = "filter"
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

                    <MultiDataList 
                    componentId="higherEducationSubjectsFilter"
                    dataField = "higher_education_subjects"
                    className = "filter"
                    title = "Hochschule:Fachbereiche"
                    data={simpleOerTags.higher_education_subjects}
                    showSearch = {
                        true
                    }
                    URLParams = {
                        true
                    }
                    size={3}
                    />

                    {/*<RangeInput
                      componentId="createdYearFilter"
                      dataField="created_year"
                      className="filter"
                      title="Ratings"
                      range={{
                        "start": 1900,
                        "end": 2019
                      }}
                      defaultValue={{
                        "start": 1900,
                        "end": 2019
                      }}
                      rangeLabels={{
                        "start": "Start",
                        "end": "End"
                      }}
                      showFilter={true}
                      stepValue={1}
                      showHistogram={true}
                      interval={2}
                      URLParams={false}
                    />*/}

                    <DateRange
                      componentId="entryAddedFilter"
                      dataField="entry_added"
                      title="Hinzugefügt"
                      className="filter"
                      queryFormat="basic_date_time"
                    />

                </div>
            </Col>
            
            <Col sm={4} lg={6}>
                <div className="result-list-container">
                <h3>Suchergebnisse</h3>
                <SelectedFilters />
                <ReactiveList 
                componentId="SearchResults"
                dataField = "entry_added"
                className = "search-results-container"
                pagination 
                URLParams
                sortBy="desc"
                // add all filters here - IMPORTANT!
                react={{
                    "and": [
                    "educationalSectorsFilter",
                    "licenseTypeFilter",
                    "higherEducationSubjectsFilter",
                    "schoolSubjectsFilter",
                    "speciaTopicsFilter",
                    "searchFilter",
                    "entryAddedFilter",
                    "generalTypesFilter"]
                }}
                render = {
                    ({
                        data
                    }) => ( <ReactiveList.ResultListWrapper> {
                            data.map(item => ( 
                                <ResultList key = {
                                    item._id
                                } >
                                <ResultList.Image src={item.thumbnail_url} />
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

                                <div className="flex column justify-space-between">
                                Lizenz: {item.license_type}<br/>
                                Bildungsbereich: {item.educational_sectors && item.educational_sectors.join(",")}<br/>
                                Beschreibung: {item.description.substring(0, 200)}<br/>
                                Lizenz-Attribution: {item.license_attribution} <br/>
                                Spezial-Thema: {item.special_topics && item.special_topics.join(",")}<br/>
                                Schule: {item.school_subjects && item.school_subjects.join(",")}<br/>
                                Hochschule: {item.higher_education_subjects && item.higher_education_subjects.join(",")}<br/>
                                Erstellungsjahr: {item.created_year}<br/>
                                Technische Formate: {item.technical_formats && item.technical_formats.join(",")}<br/>
                                Hinzugefügt: {item.entry_added}
                                </div>

                                 </ResultList.Description>
                                 
                                 </ResultList.Content>
                                 
                            </ResultList>
                            ))
                        } </ReactiveList.ResultListWrapper>
                    )
                }/>{/*eo reactiveList*/}
            </div>
            </Col>

            <Col sm={4} lg={3}>
                 <div className="filters-container">
                    <MultiDataList 
                    componentId="generalTypesFilter"
                    dataField = "general_types"
                    className = "filter"
                    title = "Material ist/enthält"
                    data={simpleOerTags.general_types}
                    showSearch = {
                        false
                    }
                    URLParams = {
                        true
                    }
                    />

                    <MultiDataList 
                    componentId="technicalFormatsFilter"
                    dataField = "technical_formats"
                    className = "filter"
                    title = "Technische Formate"
                    data={simpleOerTags.technical_formats}
                    showSearch = {
                        false
                    }
                    URLParams = {
                        true
                    }
                    />

                    

                 </div>
            </Col>


            
          </Row>
          <Row>
            <Col sm>sm=true</Col>
            <Col sm>sm=true</Col>
            <Col sm>sm=true</Col>
          </Row>
        </Container>


        {/* eo new react-bootstrap layout */}


            <div className = "row reverse-labels" >
            <div className = "col" >
            {/* We use DataList for translations */}

            {/* 2DO: show count does not work right now, wrong data field?*/}
            

            <MultiDataList 
            componentId="educationalSectorsFilter"
            dataField = "educational_sectors"
            className = "filter"
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

            

            </div>
            <div className = "col"
            style = {
                {
                    backgroundColor: '#fafafa'
                }
            } >

             </div> </div> </ReactiveBase>
        );
    }
}

export default App;