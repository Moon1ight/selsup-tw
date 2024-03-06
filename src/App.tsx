import React from 'react'
import './App.css'

interface Color {
    firstColor: string,
    secondColor?: string
}
interface Param {
    id: number;
    name: string;
    type: string;
}
interface ParamValue {
    paramId: number;
    value: string;
}
interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}
interface Props {
    params: Param[];
    model: Model;
}
interface State {
    paramValues: ParamValue[]
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            paramValues: [...props.model.paramValues]
        }
    }
    public getModel(): Model {
        return {
            paramValues: this.state.paramValues,
            colors: this.props.model.colors
        }
    }
    paramChangeHanlder = (paramId: number, value: string) => {
      this.setState(prevState => ({
        paramValues: prevState.paramValues.map(paramValue => 
          paramValue.paramId === paramId ? {...paramValue, value} : paramValue  
        )
      }))
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.props.params.map(param => (
                    <div key={param.id}>
                      <b>{param.name}</b>
                      <input 
                        type="string" 
                        value={this.state.paramValues.find(pv => pv.paramId === param.id)?.value || ""}
                        onChange={e => this.paramChangeHanlder(param.id, e.target.value)}
                      />
                    </div>
                ))}
            </div>
        )
    }
}

// ======================================================

const params = [
    {
        "id": 1,
        "name": "Назначение",
        "type": "string"
    },
    {
        "id": 2,
        "name": "Длина",
        "type": "string"
    }
]
const model = {
    "paramValues": [
        {
            "paramId": 1,
            "value": "повседневное"
        },
        {
            "paramId": 2,
                "value": "макси"
        }
    ],
    "colors": [{firstColor: 'black'}]
}

const App = () => {
  return (
    <div>
        <ParamEditor params={params} model={model}/>
    </div>
  )
}

export default App