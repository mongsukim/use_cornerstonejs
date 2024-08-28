import GradationLine from '../Icon/gradation_line';
import Eye from '../Icon/eye';

const SideMenu = () => {
  const MenuName = [
    'Abdominal Obesity - Visceral Fat Fraction',
    'Body Mass Index',
    'Abdominal Circumference',
    'Skeletal Muscle Quantity',
    'Skeletal Muscle Quality',
    'Abdominal Visceral Fat Quantity',
    'Subcutaneous Fat Quantity',
    'Bone Strength',
    'Liver Fat Index',
    'Maximum Diameter of the Aorta',
  ];

  return (
    <div className="w-[10%] flex space-y-[10px] flex-col items-start bg-[#131313] flex flex-col pl-[24px] pr-[40px] md:h-[847px] md:w-[419px]">
      <h1 className="font30_semiB pt-[24px]   ">
        AI-body composition analysis
      </h1>
      <GradationLine />
      <div className="flex flex-col space-y-[4px] w-full items-start">
        {MenuName.map((item, index) => {
          return (
            <div key={index}>
              {index === 0 ? (
                <h2 className="mb-[12px] title_19_semiB text-gray_40">
                  Obesity Analysis
                </h2>
              ) : (
                ''
              )}
              {index === 3 ? (
                <>
                  <div className="py-[20px]">
                    <GradationLine />
                  </div>{' '}
                  <h2 className="mb-[12px] title_19_semiB text-gray_40">
                    Skeletal Muscle Analysis
                  </h2>
                </>
              ) : (
                ''
              )}
              {index === 5 ? (
                <>
                  <div className="py-[20px]">
                    <GradationLine />
                  </div>
                  <h2 className="mb-[12px] title_19_semiB text-gray_40">
                    Body Fat Analysis
                  </h2>
                </>
              ) : (
                ''
              )}
              {index === 7 || index === 8 || index === 9 ? (
                <div className="py-[22px]">
                  <GradationLine />
                </div>
              ) : (
                ''
              )}
              <button
                key="index"
                className="pl-[10px] flex items-center whitespace-nowrap h-[30px]"
              >
                <Eye className="shrink-0 mr-[15px]" />
                {item}
              </button>
            </div>
          );
        })}
      </div>

      <span className="text-gray_60 text-[14px]">
        ※ If you require comprehensive explanations, we recommend consultation
        with a specialist in medicine.
      </span>
    </div>
  );
};

export default SideMenu;
