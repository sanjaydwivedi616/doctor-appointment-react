import { mount } from "enzyme";
import Rating from "../../../component/rating/Rating"



describe('When rating page is render', () => {

    describe('Should rating is render with number star', () => {
        let wrapper;
        const rating = 5;
        beforeEach(() => {
            wrapper = mount(<Rating props={rating} />)
        })

        it('should rating will render', () => {
            expect(wrapper).not.toBeNull();
        });

    })

    describe('Should rating is render with no star', () => {

        let wrapper;
        const rating = 0
        beforeEach(() => {
            wrapper = mount(<Rating props={rating} />)
        })

        it('should rating will render', () => {
            expect(wrapper).not.toBeNull();
        });

    })
})