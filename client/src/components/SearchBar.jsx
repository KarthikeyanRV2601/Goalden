import {React} from 'react';


export const SearchBar=()=>{
    return(
        <div className="SearchBar">
                <input type="Text" className="FriendSearch" placeholder="search people here" />
                <svg version="1.1" className="SearchIcon"/>
        </div>
    )
}