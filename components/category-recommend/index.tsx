import { Label } from '@/components/ui/label';
import ChatList from "@/components/chat-list";

const CategoryRecommendation = ({ category, chatbots } : any) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="w-full md:w-1/2 pr-4">
                <Label className="text-2xl font-semibold mb-4 block">당신과 이 캐릭터의 {category.name}는 어떨까요?</Label>
                <Label className="text-gray-600 block">
                    {category.name}를 통해 새로운 관계를 경험해보세요. 
                    이 캐릭터들과의 대화를 통해 특별한 순간을 만들어갈 수 있습니다.
                </Label>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
                {chatbots.map((chatbot : any) => (
                    <div key={chatbot.id} className="mb-4">
                        <ChatList
                            img={chatbot.img}
                            name={chatbot.name}
                            desc={chatbot.chatbot_desc}
                            link={chatbot.id.toString()}
                            category={category.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryRecommendation;