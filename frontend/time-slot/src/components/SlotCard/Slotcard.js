const SlotCard = (props) => {
    const { slots } = props
    // data-testid is a testing id 
    // which is used only during tests
    return (
        <>

        
        <div data-testid="Slot-Card-1"  className="wt-card">
            <div className="wt-card-head">
            <div className="card-head-left"><input type="checkbox" /> Monday</div>
            <div className="card-head-right">
                <button className="button1">Copy Schedule</button>
                <button className="button2">+ Add Slot</button>
            </div>
            </div>
            <div className="wt-card-content">
            {/* slot:start*/}
            <div className="wt-block">
                <div className="input-group">
                <input type="time" className="w-130" />
                <input data-testid="slot-box" type="text" className="w-90" defaultValue={"10"}/>
                <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
                </div>
            </div>
            {/* slot:end*/}
            {/* slot:start*/}
            <div className="wt-block">
                <div className="input-group">
                <input type="time" className="w-130" />
                <input type="text" className="w-90" />
                <span className="delete-btn"><i className="fa-sharp fa-solid fa-trash" /></span>
                </div>
            </div>
            {/* slot:end*/}
            </div>
        </div>
      
        </>
    )
}
  
export default SlotCard;