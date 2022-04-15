import ListData from "../../component/ListData";
import renderer from 'react-test-renderer';


describe('Whene list data is render', () => {

    it('Whene list data is render.', () => {
        const data = { doctorName: "Dr. test", email: "test@gmail.com" };
        const result = ListData(data);
        expect(result).toEqual(action)
    })

    it('Whene list data is render html.', () => {
        const dataListText = renderer.create(<ListData />)
        expect(dataListText).toMatchSnapshot();
    })
})